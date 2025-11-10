// 확장 프로그램 설치 시 기본값 설정
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ autoShowTranscript: true });
});

// 메시지 리스너 (필요시 사용)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    chrome.storage.sync.get(['autoShowTranscript'], (result) => {
      sendResponse({ enabled: result.autoShowTranscript ?? true });
    });
    return true;
  }
});
