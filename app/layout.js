import './globals.css';

const SITE_URL = 'https://ticket.jjyu.co.kr';
const SITE_NAME = 'TICKETDAY';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '공연·전시·축제 티켓 예매 일정과 가격 | TICKETDAY',
    template: '%s | TICKETDAY',
  },
  description:
    '뮤지컬·콘서트·연극·전시·스포츠·축제의 예매 오픈 일정, 좌석 가격, 선예매 조건, 취소 기준을 공식 예매처 기준으로 정리합니다.',
  keywords: ['티켓 예매', '예매 일정', '티켓 오픈', '콘서트 예매', '뮤지컬 예매', '전시 예매', '축제 일정'],
  openGraph: { type: 'website', locale: 'ko_KR', siteName: SITE_NAME },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  alternates: { types: { 'application/rss+xml': `${SITE_URL}/rss.xml` } },
  manifest: '/site.webmanifest',
};

export const viewport = { themeColor: '#e6213a' };

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: '공연·전시·축제 티켓 예매 정보',
      inLanguage: 'ko-KR',
    },
    { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL },
  ],
};

import { CATS as CATPAIRS, catHref } from '../lib/cats';
const CATS = CATPAIRS.map(([n]) => n);

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Gothic+A1:wght@500;700;800;900&display=swap"
        />
        <meta name="naver-site-verification" content="fc881fe66760858423ad5283e0f9c0d3d3fe39fa" />
        <meta name="DaumWebMasterTool" content="4c0735aaa7fda54aa569c42487e1d17a606aed400185d4c176d807e33cd896e7:WoYFtMaR84eZ7MaX1Xjw9A==" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fundingchoicesmessages.google.com" crossOrigin="anonymous" />
        {/* Offerwall 선로드 — 애드센스 뒤에 붙이면 표시가 2초 넘게 밀린다(퀴즈에서 실측). game.jjyu 와 동일 */}
        <script async src="https://fundingchoicesmessages.google.com/i/ca-pub-2442517902625121?ers=1" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function s(){if(!window.frames['googlefcPresent']){if(document.body){var i=document.createElement('iframe');i.style='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;';i.style.display='none';i.name='googlefcPresent';document.body.appendChild(i);}else{setTimeout(s,0);}}}s();})();",
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442517902625121"
          crossOrigin="anonymous"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </head>
      <body>
        <div className="topbar">
          <div className="wrap">
            <div><span>공연 · 전시 · 스포츠 예매 정보</span></div>
            <div><span>예매처 안내</span><span>공연장</span><span>이용안내</span></div>
          </div>
        </div>
        <header className="gnb">
          <div className="wrap">
            <a className="logo" href="/"><i />TICKETDAY</a>
            <nav className="cats">
              {CATS.map((c) => (
                <a key={c} href={catHref(c)}>{c}</a>
              ))}
            </nav>
            <div className="search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              공연명, 아티스트 검색
            </div>
          </div>
        </header>
        {children}
        <footer>
          <div className="wrap">
            <div>
              TICKETDAY는 공연·전시·스포츠·축제의 예매 정보를 정리해 제공하며, 티켓 판매와 결제는 각 공식 예매처(티켓링크·NOL·예스24 등)에서 이루어집니다. 예매 일정과 가격은 주최사 사정에 따라 변경될 수 있으니 예매 전 공식 예매처에서 다시 확인하세요.
            </div>
            <div>표기된 공연명·아티스트·상표는 각 소유자의 자산입니다. © {new Date().getFullYear()} ticket.jjyu.co.kr</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
