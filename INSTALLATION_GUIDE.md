# 개인 사용 설치 가이드

Chrome Web Store 없이 직접 설치하여 사용하는 방법입니다.

## 방법 1: 개발자 모드로 직접 설치 (추천)

### 현재 PC에 설치

1. Chrome 브라우저 열기
2. 주소창에 입력: `chrome://extensions/`
3. 우측 상단 "개발자 모드" 토글 **켜기**
4. "압축해제된 확장 프로그램을 로드합니다" 클릭
5. 폴더 선택: `d:\Repo\yt-show-transcribe`
6. 완료!

### 장점
- 가장 간단하고 빠름
- 파일 수정 시 즉시 새로고침 가능
- 디버깅 용이

### 단점
- "개발자 모드" 켜야 함
- 각 PC마다 수동 설치 필요

---

## 방법 2: ZIP 파일로 배포

다른 PC나 다른 사람에게 공유하고 싶을 때 사용하세요.

### 1단계: ZIP 파일 생성

#### Windows (PowerShell)

```powershell
# 프로젝트 폴더로 이동
cd d:\Repo\yt-show-transcribe

# ZIP 파일 생성 (필요한 파일만 포함)
Compress-Archive -Path manifest.json, background.js, content.js, popup.html, popup.js, popup.css -DestinationPath youtube-transcript-auto-show.zip -Force
```

#### Windows (탐색기에서 수동)

1. `d:\Repo\yt-show-transcribe` 폴더 열기
2. 다음 파일들 선택:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `popup.html`
   - `popup.js`
   - `popup.css`
   - `icons` 폴더 (아이콘 생성했다면)
3. 선택한 파일에서 우클릭 → "압축(Zip) 폴더로 보내기"
4. 파일명: `youtube-transcript-auto-show.zip`

**주의**: 폴더 자체가 아닌 **파일들을 직접 선택**해서 압축해야 합니다!

### 2단계: 다른 PC에 설치

#### 방법 A: 압축 해제 후 설치 (추천)

1. ZIP 파일을 원하는 위치에 복사
2. 압축 해제 (예: `C:\Users\사용자명\Documents\ChromeExtensions\yt-transcript\`)
3. Chrome 열고 `chrome://extensions/` 접속
4. "개발자 모드" 켜기
5. "압축해제된 확장 프로그램을 로드합니다" 클릭
6. 압축 해제한 폴더 선택
7. 완료!

#### 방법 B: CRX 파일로 패키징 (고급)

CRX는 Chrome 확장 프로그램 패키지 형식입니다.

1. `chrome://extensions/` 접속
2. "개발자 모드" 켜기
3. 위 방법 A로 먼저 확장 프로그램 로드
4. "확장 프로그램 패키지" 버튼 클릭
5. 압축 해제한 폴더 선택
6. `.crx` 파일 생성됨
7. 이 `.crx` 파일을 다른 PC의 `chrome://extensions/`에 드래그앤드롭

**주의**: 최근 Chrome 버전에서는 CRX 설치 시 보안 경고가 나올 수 있습니다.

---

## 방법 3: GitHub을 통한 배포

여러 PC에서 사용하거나 다른 사람과 공유할 때 가장 좋은 방법입니다.

### 1단계: GitHub에 업로드

```bash
cd d:\Repo\yt-show-transcribe

# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소에 푸시
git remote add origin https://github.com/사용자명/yt-show-transcribe.git
git push -u origin main
```

### 2단계: 다른 PC에서 설치

```bash
# 저장소 클론
git clone https://github.com/사용자명/yt-show-transcribe.git
cd yt-show-transcribe
```

그 후 Chrome에서:
1. `chrome://extensions/` 접속
2. "개발자 모드" 켜기
3. "압축해제된 확장 프로그램을 로드합니다" 클릭
4. 클론한 폴더 선택

### 장점
- 버전 관리 가능
- 여러 PC에서 쉽게 동기화
- 업데이트 간편 (`git pull`)
- 다른 사람과 공유 쉬움

---

## 자동 업데이트 불가 안내

**중요**: 개발자 모드로 설치한 확장 프로그램은 **자동 업데이트가 되지 않습니다**.

### 수동 업데이트 방법

#### ZIP 파일 사용 시
1. 새 ZIP 파일 다운로드
2. 기존 폴더에 압축 해제 (덮어쓰기)
3. `chrome://extensions/`에서 새로고침 버튼 클릭

#### GitHub 사용 시
```bash
cd yt-show-transcribe
git pull
```
그 후 `chrome://extensions/`에서 새로고침 버튼 클릭

---

## 여러 PC에 설치하기

### 옵션 1: USB/클라우드 드라이브

1. ZIP 파일 또는 폴더 전체를 USB/OneDrive/Google Drive에 저장
2. 각 PC에서 복사 후 설치

### 옵션 2: 네트워크 공유

1. 회사 네트워크 공유 폴더에 업로드
2. 각 PC에서 접근하여 설치

### 옵션 3: 이메일/메신저

1. ZIP 파일 전송
2. 받는 사람이 압축 해제 후 설치

---

## 제거 방법

1. `chrome://extensions/` 접속
2. "YouTube Transcript Auto Show" 찾기
3. "삭제" 버튼 클릭

---

## 문제 해결

### "압축해제된 확장 프로그램을 로드합니다" 버튼이 안 보여요
→ "개발자 모드" 토글을 켜야 합니다

### "매니페스트를 로드할 수 없습니다" 오류
→ ZIP 압축 시 파일들이 하위 폴더에 들어가지 않았는지 확인
→ `manifest.json`이 최상위에 있어야 함

### 확장 프로그램이 작동하지 않아요
→ `chrome://extensions/`에서 확장 프로그램 새로고침
→ YouTube 페이지 새로고침 (F5)

### Chrome 재시작 시 비활성화됨
→ 정상입니다. 개발자 모드 확장은 매번 활성화 확인이 필요합니다
→ 경고 무시하고 "확장 프로그램 유지" 클릭

---

## 추천 설치 방법 요약

| 상황 | 추천 방법 |
|------|-----------|
| 혼자 사용 | 방법 1 (개발자 모드 직접 설치) |
| 2-3대 PC에서 사용 | 방법 2 (ZIP 파일) |
| 여러 PC에서 사용 | 방법 3 (GitHub) |
| 다른 사람과 공유 | 방법 3 (GitHub) |
| 자주 업데이트 | 방법 3 (GitHub) |

---

## 참고

- Chrome Web Store 등록 없이도 완전히 작동합니다
- 개인정보는 전혀 수집되지 않습니다
- 오픈 소스이므로 누구나 코드를 확인할 수 있습니다
