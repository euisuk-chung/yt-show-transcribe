// DOM 요소 가져오기
const toggle = document.getElementById('autoShowToggle');
const statusText = document.getElementById('statusText');
const manualToggleBtn = document.getElementById('manualToggleBtn');
const toggleBtnText = document.getElementById('toggleBtnText');
const stateIndicator = document.getElementById('stateIndicator');
const stateText = document.getElementById('stateText');

// 저장된 설정 불러오기
chrome.storage.sync.get(['autoShowTranscript'], (result) => {
  const isEnabled = result.autoShowTranscript ?? true;
  toggle.checked = isEnabled;
  updateStatusText(isEnabled);
});

// 현재 페이지 상태 확인
function updateCurrentState() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) return;

    const tab = tabs[0];

    // YouTube 페이지인지 확인
    if (!tab.url?.includes('youtube.com/watch')) {
      stateIndicator.className = 'state-indicator unknown';
      stateText.textContent = 'YouTube 영상 페이지가 아닙니다';
      manualToggleBtn.disabled = true;
      manualToggleBtn.style.opacity = '0.5';
      manualToggleBtn.style.cursor = 'not-allowed';
      return;
    }

    manualToggleBtn.disabled = false;
    manualToggleBtn.style.opacity = '1';
    manualToggleBtn.style.cursor = 'pointer';

    // 현재 상태 조회
    chrome.tabs.sendMessage(tab.id, { action: 'getState' })
      .then((response) => {
        if (response.exists && response.isOpen) {
          stateIndicator.className = 'state-indicator open';
          stateText.textContent = '스크립트 열림';
          toggleBtnText.textContent = '스크립트 숨기기';
        } else if (response.exists) {
          stateIndicator.className = 'state-indicator closed';
          stateText.textContent = '스크립트 닫힘';
          toggleBtnText.textContent = '스크립트 표시';
        } else {
          stateIndicator.className = 'state-indicator unknown';
          stateText.textContent = '스크립트 사용 불가';
          manualToggleBtn.disabled = true;
          manualToggleBtn.style.opacity = '0.5';
        }
      })
      .catch(() => {
        stateIndicator.className = 'state-indicator unknown';
        stateText.textContent = '상태 확인 실패';
      });
  });
}

// 팝업 열릴 때 상태 업데이트
updateCurrentState();

// 자동 표시 토글 변경 이벤트
toggle.addEventListener('change', (e) => {
  const isEnabled = e.target.checked;

  // 설정 저장
  chrome.storage.sync.set({ autoShowTranscript: isEnabled }, () => {
    updateStatusText(isEnabled);

    // 현재 탭에 메시지 전송 (즉시 적용)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleTranscript',
          enabled: isEnabled
        }).catch(() => {
          // 에러 무시 (YouTube 페이지가 아닐 수 있음)
        });
      }
    });
  });
});

// 수동 토글 버튼 클릭 이벤트
manualToggleBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) return;

    chrome.tabs.sendMessage(tabs[0].id, { action: 'manualToggle' })
      .then((response) => {
        if (response.success) {
          // 상태 즉시 업데이트
          setTimeout(updateCurrentState, 300);
        }
      })
      .catch((error) => {
        console.error('토글 실패:', error);
        stateText.textContent = '토글 실패';
      });
  });
});

// 상태 텍스트 업데이트
function updateStatusText(isEnabled) {
  statusText.textContent = isEnabled ? '활성화' : '비활성화';
  statusText.style.color = isEnabled ? '#00c853' : '#ff5252';
}
