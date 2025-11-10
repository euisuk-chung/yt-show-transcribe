# YouTube Transcript Auto Show

유튜브 영상의 스크립트(대본)를 자동으로 표시해주는 Chrome 확장 프로그램입니다.

## 기능

- ✅ 유튜브 영상 페이지 접속 시 자동으로 스크립트 표시
- ✅ 토글 버튼으로 쉽게 켜고 끄기 가능
- ✅ 설정이 자동으로 저장됨
- ✅ 페이지 이동 시에도 자동 적용

## 설치 방법

### 1. 개발자 모드로 설치 (로컬)

1. Chrome 브라우저에서 `chrome://extensions/` 접속
2. 우측 상단의 "개발자 모드" 토글 활성화
3. "압축해제된 확장 프로그램을 로드합니다" 클릭
4. 이 프로젝트 폴더 선택

### 2. 아이콘 생성 (선택사항)

현재 아이콘 파일이 없으면:

1. [icons/create-icons.html](icons/create-icons.html) 파일을 브라우저로 열기
2. 표시되는 다운로드 링크로 `icon16.png`, `icon48.png`, `icon128.png` 다운로드
3. `icons` 폴더에 저장

또는 직접 아이콘 이미지를 만들어 `icons` 폴더에 넣으셔도 됩니다.

## 사용 방법

1. 확장 프로그램 아이콘 클릭
2. 토글 스위치로 기능 켜기/끄기
3. 유튜브 영상 페이지 방문 시 자동으로 스크립트 표시

## 파일 구조

```plaintext
yt-show-transcribe/
├── manifest.json       # 확장 프로그램 설정
├── background.js       # 백그라운드 서비스 워커
├── content.js          # 유튜브 페이지 스크립트
├── popup.html          # 팝업 UI
├── popup.js            # 팝업 로직
├── popup.css           # 팝업 스타일
├── icons/              # 아이콘 폴더
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## 기술 스택

- Manifest V3
- Chrome Extension APIs
- Vanilla JavaScript
- CSS3

## 문제 해결

### 스크립트가 자동으로 표시되지 않을 때

- 확장 프로그램이 활성화되어 있는지 확인
- 유튜브 페이지를 새로고침
- 일부 영상은 스크립트가 없을 수 있음

### 권한 관련 문제

- `chrome://extensions/`에서 확장 프로그램의 권한 확인
- 필요시 확장 프로그램 제거 후 재설치

## 라이선스

MIT License
