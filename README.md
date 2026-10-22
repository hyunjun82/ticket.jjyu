# ticket.jjyu — TICKETDAY

`ticket.jjyu.co.kr` · 공연·전시·스포츠·축제 티켓 예매 정보. Next.js 정적 내보내기 + Cloudflare Workers (game.jjyu 와 동일 구조).

## 구조

```
data/events/<slug>.json   공연 1개 = 파일 1개. 예매처에서 실측한 값만 담는다 (지어낸 값 금지)
lib/events.js             JSON → 페이지용 데이터
app/page.js               메인: 배너 · 카테고리 · 티켓오픈 예정 · 주간 랭킹 · 주말 축제
app/[slug]/page.js        예매형 템플릿 (포스터 + 상품정보 + 회차/오픈일정 패널 + 탭 + 소제목 4개 + FAQ)
components/LiveBits.js    방문 시점 D-day·오픈 상태·탭 활성화 (정적 페이지 보정)
components/Poster.js      public/posters/ 에 공식 포스터가 있으면 이미지, 없으면 타이포 포스터
scripts/verify.mjs        발행 점검 (필수 항목·slug·예매 URL·소제목 수)
```

## 규칙

- 타이틀 = 네이버 연관검색어 실측 롱테일. 타이틀의 세부 키워드 4개 = 소제목 1~4, 순서 동일. 40자 이내.
- 서론 상단 버튼은 「티켓 예매하기」 하나. 공식 예매처(티켓링크·NOL·예스24) 상품 페이지로 딥링크.
- 본문 숫자·일정·규정은 전부 예매처 상품 페이지에서 가져온 것만. `source`, `checkedAt` 필수.
- 타사 로고·브랜드 도용, 가짜 로그인·결제 흐름 없음. 포스터는 `public/posters/` 에 넣은 파일만 표시.
- 템플릿 2종: `type: booking`(뮤지컬·콘서트·연극·전시·클래식·스포츠), `type: festival`(축제·불꽃놀이·에어쇼 — 현장 사진 갤러리형, 추후 추가)

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run verify   # 데이터 점검
npm run build    # out/ 생성
```
