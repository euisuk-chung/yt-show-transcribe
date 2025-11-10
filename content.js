// 스크립트 패널 상태 확인 함수
function getTranscriptPanelState() {
  const panel = document.querySelector(
    'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]'
  );

  if (!panel) {
    return { exists: false, isOpen: false };
  }

  const visibility = panel.getAttribute('visibility');
  const isOpen = visibility === 'ENGAGEMENT_PANEL_VISIBILITY_EXPANDED';

  return { exists: true, isOpen, panel, visibility };
}

// 스크립트 버튼 찾기
function findTranscriptButton() {
  const buttons = document.querySelectorAll('button, tp-yt-paper-button, [role="button"]');

  for (const button of buttons) {
    const text = button.textContent?.trim().toLowerCase();
    const ariaLabel = button.getAttribute('aria-label')?.toLowerCase();

    // 한글 또는 영문으로 "스크립트" 또는 "transcript" 포함 여부 확인
    if (text?.includes('스크립트') ||
        text?.includes('transcript') ||
        ariaLabel?.includes('스크립트') ||
        ariaLabel?.includes('transcript')) {
      return button;
    }
  }

  return null;
}

// 스크립트 표시 함수
function showTranscript() {
  const state = getTranscriptPanelState();

  // 이미 열려있으면 아무것도 하지 않음
  if (state.isOpen) {
    console.log('YouTube Transcript Auto Show: 스크립트 이미 열려있음');
    return true;
  }

  const button = findTranscriptButton();
  if (button) {
    console.log('YouTube Transcript Auto Show: 스크립트 열기');
    button.click();
    return true;
  }

  return false;
}

// 스크립트 숨김 함수
function hideTranscript() {
  const state = getTranscriptPanelState();

  // 이미 닫혀있으면 아무것도 하지 않음
  if (!state.isOpen) {
    console.log('YouTube Transcript Auto Show: 스크립트 이미 닫혀있음');
    return true;
  }

  const button = findTranscriptButton();
  if (button) {
    console.log('YouTube Transcript Auto Show: 스크립트 닫기');
    button.click();
    return true;
  }

  return false;
}

// 스크립트 토글 함수
function toggleTranscript() {
  const state = getTranscriptPanelState();

  if (state.isOpen) {
    return hideTranscript();
  } else {
    return showTranscript();
  }
}

// 페이지 변경 감지 및 스크립트 자동 표시
let lastUrl = location.href;
let retryCount = 0;
const MAX_RETRIES = 10;

function checkAndShowTranscript() {
  chrome.storage.sync.get(['autoShowTranscript'], (result) => {
    if (result.autoShowTranscript === false) {
      console.log('YouTube Transcript Auto Show: 비활성화 상태');
      return;
    }

    // 동영상 페이지인지 확인
    if (location.pathname === '/watch') {
      retryCount = 0;
      attemptShowTranscript();
    }
  });
}

function attemptShowTranscript() {
  if (retryCount >= MAX_RETRIES) {
    console.log('YouTube Transcript Auto Show: 최대 재시도 횟수 초과');
    return;
  }

  const success = showTranscript();

  if (!success) {
    retryCount++;
    // 페이지 로딩 대기 후 재시도 (점진적으로 대기 시간 증가)
    setTimeout(attemptShowTranscript, 500 + (retryCount * 500));
  }
}

// URL 변경 감지 (SPA 방식의 YouTube 대응)
const observer = new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    checkAndShowTranscript();
  }
});

// 페이지 로드 시 초기 실행
window.addEventListener('load', () => {
  checkAndShowTranscript();
});

// DOM 변경 감지 시작
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 초기 페이지에서도 확인
checkAndShowTranscript();

// 메시지 리스너 (팝업에서 명령 수신)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleTranscript') {
    // 자동 표시 설정 변경 시
    if (request.enabled) {
      checkAndShowTranscript();
    }
    sendResponse({ success: true });
  } else if (request.action === 'manualToggle') {
    // 수동 토글 버튼 클릭 시
    const success = toggleTranscript();
    const state = getTranscriptPanelState();
    sendResponse({ success, isOpen: state.isOpen });
  } else if (request.action === 'getState') {
    // 현재 상태 조회
    const state = getTranscriptPanelState();
    sendResponse({ isOpen: state.isOpen, exists: state.exists });
  }
  return true; // 비동기 응답을 위해 true 반환
});
