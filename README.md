# 우리 둘만의 공간

React와 Vite로 만든 커플 기록 보드입니다.

## 로컬에서 실행하기

```powershell
npm.cmd install
npm.cmd run dev
```

터미널에 표시되는 로컬 주소를 브라우저에서 엽니다.

## GitHub Pages 배포

저장소의 `main` 또는 `master` 브랜치에 코드를 push하면 GitHub Actions가 빌드하고 자동으로 배포합니다. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정해야 합니다.

배포 주소: https://hamhj7694.github.io/React_Assignment/

게시글과 채팅 내용은 현재 브라우저의 `localStorage`에만 저장됩니다. 따라서 다른 기기나 브라우저와 데이터가 공유되지는 않습니다.
