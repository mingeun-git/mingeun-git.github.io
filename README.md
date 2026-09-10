# 신민근 포트폴리오

정적 웹 페이지 한 벌입니다. 빌드 도구나 설치 과정이 없고, `index.html`을 브라우저로 바로 열면 그대로 동작합니다.

## 파일 구조

```
portfolio/
├─ index.html              모든 내용
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css        디자인 토큰 (색·타입·간격·모서리·모션)
│  │  └─ main.css          컴포넌트 스타일
│  └─ js/
│     └─ main.js           스크롤 위치 표시, 화면 밝기 전환
└─ README.md
```

## 디자인 규칙

**색** Material Design 3의 톤 팔레트 방식을 따르되, 기본 보라 대신 페트롤 청록 `#1A6068`을 소스 컬러로 잡아 톤 램프를 직접 만들었습니다. 강조색인 구리 `#7B5433`은 "기준을 넘어 집행된 것"에만 씁니다. 아무 데나 쓰면 강조의 의미가 사라집니다.

**밝기** 방문자의 운영체제 설정을 따라가고, 오른쪽 위 버튼으로 직접 바꿀 수도 있습니다. 선택은 브라우저에 저장됩니다.

**토큰** `tokens.css`는 세 겹입니다. 원시값(`--p-`) → 의미(`--color-`, `--type-`) → 컴포넌트(`--card-`, `--chart-`). `main.css`에서는 색 코드를 직접 쓰지 않고 항상 토큰을 거칩니다. 색을 바꾸려면 `tokens.css`의 원시 팔레트만 손대면 전체가 따라옵니다.

**그래프** 이미지 파일이나 차트 라이브러리를 쓰지 않았습니다. 전부 HTML과 인라인 SVG로 그렸기 때문에 밝기 전환과 화면 크기 변화를 그대로 따라갑니다.

**글꼴** IBM Plex Sans KR 한 가족만 씁니다. Google Fonts에서 불러옵니다.

## GitHub Pages로 올리기

1. GitHub에서 새 저장소를 만듭니다. 이름은 자유롭게 정하되, `<계정명>.github.io`로 만들면 주소가 가장 짧아집니다.

2. 이 폴더 안의 내용을 저장소 루트에 올립니다. `portfolio` 폴더째로 올리지 말고, `index.html`이 저장소 최상단에 오도록 합니다.

```bash
cd portfolio
git init
git add .
git commit -m "포트폴리오 첫 배포"
git branch -M main
git remote add origin https://github.com/<계정명>/<저장소명>.git
git push -u origin main
```

3. 저장소의 Settings → Pages로 갑니다. Source를 `Deploy from a branch`, Branch를 `main` / `/ (root)`로 두고 저장합니다.

4. 1분 정도 뒤 `https://<계정명>.github.io/<저장소명>/`에서 열립니다.

수정할 때는 파일을 고치고 다시 커밋해 push하면 자동으로 반영됩니다.

```bash
git add .
git commit -m "수정 내용"
git push
```

## 올리기 전에 채워야 할 곳

`index.html` 안에 `TODO` 주석으로 표시해 두었습니다.

- **연락처** 페이지 맨 아래 이메일 주소와 깃허브 주소가 비어 있습니다.
- **데이터 분석 프로젝트 2, 3번** `정리 중`으로 표시된 카드 두 개가 비어 있습니다. 첫 번째 카드와 같은 형식으로 제목, 설명, 수치, 문제·방법·결과를 채우면 됩니다.

## 내용을 고칠 때

새 사례를 추가하려면 `index.html`의 `<article class="case">` 블록을 통째로 복사해 붙이고 안의 글을 바꾸면 됩니다. 구조는 다음과 같습니다.

```
case__head    사례 번호, 제목, 한 줄 결과, 태그
case__grid    왼쪽 beats(상황·판단·실행) + 오른쪽 viz(그래프)
case__insight 맨 아래 인사이트 한 문단
```

시각화 블록은 네 종류가 준비되어 있습니다.

| 클래스 | 쓰임 |
| --- | --- |
| `.bars` | 항목별 크기 비교. 가로 막대 |
| `.steps` | 단계별 축소. 퍼널 |
| `.gauges` | 목표 대비 달성률 |
| `.dtable` | 수치 표 |

막대 길이는 `style="--w:70%"`로, 게이지는 `--w`와 목표 표시선 `--at`으로 조절합니다.
