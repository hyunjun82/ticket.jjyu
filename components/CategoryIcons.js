/**
 * 카테고리 아이콘 — NOL 홈 아이콘 줄처럼 입체(3D 느낌) 오브젝트.
 * 선 아이콘이 아니라 그라데이션 면 + 하이라이트 + 그림자로 그린다.
 */
function Defs({ id, a, b }) {
  return (
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={a} />
        <stop offset="1" stopColor={b} />
      </linearGradient>
      <linearGradient id={`${id}-hi`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".75" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor={b} floodOpacity=".45" />
      </filter>
    </defs>
  );
}

const Musical = () => (
  <svg viewBox="0 0 64 64"><Defs id="mu" a="#ff8fb1" b="#e0245e" />
    <g filter="url(#mu-sh)">
      <path d="M12 14h40a3 3 0 0 1 3 3v6c-6 3-6 23 0 26v3a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3v-3c6-3 6-23 0-26v-6a3 3 0 0 1 3-3z" fill="url(#mu-g)" />
      <path d="M12 14h40a3 3 0 0 1 3 3v6c-2 1-3.5 4-4.5 8H13.5C12.5 27 11 24 9 23v-6a3 3 0 0 1 3-3z" fill="url(#mu-hi)" />
      <circle cx="32" cy="36" r="6.5" fill="#fff" fillOpacity=".92" />
      <path d="M32 31.5l1.4 2.9 3.2.4-2.3 2.2.6 3.2-2.9-1.6-2.9 1.6.6-3.2-2.3-2.2 3.2-.4z" fill="#e0245e" />
      <path d="M20 44h24" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
    </g>
  </svg>
);

const Concert = () => (
  <svg viewBox="0 0 64 64"><Defs id="co" a="#9f8cff" b="#5438e6" />
    <g filter="url(#co-sh)">
      <rect x="22" y="8" width="20" height="30" rx="10" fill="url(#co-g)" />
      <rect x="25" y="11" width="8" height="18" rx="4" fill="url(#co-hi)" />
      <path d="M16 30a16 16 0 0 0 32 0" fill="none" stroke="url(#co-g)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M32 46v8" stroke="url(#co-g)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M22 55h20" stroke="url(#co-g)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M24 18h16M24 24h16" stroke="#fff" strokeOpacity=".45" strokeWidth="1.6" />
    </g>
  </svg>
);

const Play = () => (
  <svg viewBox="0 0 64 64"><Defs id="pl" a="#ffc46b" b="#ef7d00" />
    <g filter="url(#pl-sh)">
      <path d="M8 12h24v18a12 12 0 0 1-24 0z" fill="url(#pl-g)" />
      <path d="M8 12h24v8H8z" fill="url(#pl-hi)" />
      <path d="M13 21h4M23 21h4" stroke="#7a3a00" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M13 29c2 3.5 12 3.5 14 0" fill="none" stroke="#7a3a00" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M32 22h24v18a12 12 0 0 1-24 0z" fill="#fff5e6" />
      <path d="M37 32h4M47 32h4" stroke="#b85400" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M37 42c2-3.5 12-3.5 14 0" fill="none" stroke="#b85400" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  </svg>
);

const Exhibit = () => (
  <svg viewBox="0 0 64 64"><Defs id="ex" a="#7fe0a6" b="#13a05a" />
    <g filter="url(#ex-sh)">
      <rect x="8" y="10" width="48" height="36" rx="5" fill="url(#ex-g)" />
      <rect x="14" y="16" width="36" height="24" rx="2.5" fill="#f3fff7" />
      <path d="M14 36l9-9 7 7 5-5 15 11H14z" fill="#13a05a" fillOpacity=".85" />
      <circle cx="40" cy="23" r="3.5" fill="#ffd34d" />
      <rect x="8" y="10" width="48" height="12" rx="5" fill="url(#ex-hi)" />
      <path d="M26 54h12M32 46v8" stroke="url(#ex-g)" strokeWidth="4" strokeLinecap="round" />
    </g>
  </svg>
);

const Classic = () => (
  <svg viewBox="0 0 64 64"><Defs id="cl" a="#9aa6b8" b="#3b4656" />
    <g filter="url(#cl-sh)">
      <path d="M26 44V12l26-5v32" fill="none" stroke="url(#cl-g)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 20l26-5" stroke="#fff" strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="18" cy="46" rx="9" ry="7" fill="url(#cl-g)" />
      <ellipse cx="44" cy="41" rx="9" ry="7" fill="url(#cl-g)" />
      <ellipse cx="15" cy="43" rx="4" ry="2.4" fill="url(#cl-hi)" />
      <ellipse cx="41" cy="38" rx="4" ry="2.4" fill="url(#cl-hi)" />
    </g>
  </svg>
);

const Sports = () => (
  <svg viewBox="0 0 64 64"><Defs id="sp" a="#7cc8ff" b="#0b6fc2" />
    <g filter="url(#sp-sh)">
      <circle cx="32" cy="32" r="23" fill="url(#sp-g)" />
      <circle cx="32" cy="32" r="23" fill="url(#sp-hi)" />
      <path d="M32 24l7.5 5.5-2.9 8.8h-9.2L24.5 29.5z" fill="#fff" />
      <path d="M32 24v-9M39.5 29.5l8.5-3M36.6 38.3l5.2 7.2M27.4 38.3l-5.2 7.2M24.5 29.5l-8.5-3" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 9a23 23 0 0 1 23 23" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

const Festival = () => (
  <svg viewBox="0 0 64 64"><Defs id="fe" a="#ff9a8b" b="#e6213a" />
    <g filter="url(#fe-sh)">
      <path d="M32 56V30" stroke="url(#fe-g)" strokeWidth="4.5" strokeLinecap="round" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
        <g key={d} transform={`rotate(${d} 32 24)`}>
          <path d="M32 22V9" stroke="url(#fe-g)" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="32" cy="7" r="3.2" fill="#ffd34d" />
        </g>
      ))}
      <circle cx="32" cy="24" r="6" fill="#fff" /><circle cx="32" cy="24" r="3" fill="#e6213a" />
      <circle cx="12" cy="40" r="2.2" fill="#ffd34d" /><circle cx="52" cy="38" r="2.2" fill="#9f8cff" /><circle cx="16" cy="52" r="1.8" fill="#7fe0a6" /><circle cx="50" cy="52" r="1.8" fill="#7cc8ff" />
    </g>
  </svg>
);

export const CATEGORIES = [
  { name: '뮤지컬', bg: 'linear-gradient(145deg,#fff1f5,#ffdbe6)', Icon: Musical },
  { name: '콘서트', bg: 'linear-gradient(145deg,#f1eeff,#e0d9ff)', Icon: Concert },
  { name: '연극', bg: 'linear-gradient(145deg,#fff7ea,#ffe8c2)', Icon: Play },
  { name: '전시', bg: 'linear-gradient(145deg,#edfcf3,#d3f5e1)', Icon: Exhibit },
  { name: '클래식', bg: 'linear-gradient(145deg,#f4f6f9,#e3e8ef)', Icon: Classic },
  { name: '스포츠', bg: 'linear-gradient(145deg,#eaf6ff,#d2ebff)', Icon: Sports },
  { name: '축제', bg: 'linear-gradient(145deg,#fff2f0,#ffdcd8)', Icon: Festival },
];

export default function CategoryIcons() {
  return (
    <div className="chips">
      {CATEGORIES.map(({ name, bg, Icon }) => (
        <a className="chip" key={name} href={`/?cat=${encodeURIComponent(name)}`}>
          <i style={{ background: bg }}><Icon /></i>
          {name}
        </a>
      ))}
    </div>
  );
}
