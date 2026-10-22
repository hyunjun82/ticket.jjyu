import { getAllEvents, won, dots, dday } from '../lib/events';

const CATS = ['뮤지컬', '콘서트', '연극', '전시', '클래식', '스포츠', '축제'];
const INITIAL = { 뮤지컬: 'M', 콘서트: 'C', 연극: 'P', 전시: 'E', 클래식: 'K', 스포츠: 'S', 축제: 'F' };

export const metadata = { alternates: { canonical: '/' } };

function Card({ e, rank, openTag }) {
  const low = e.seats?.length ? Math.min(...e.seats.map((s) => s.price)) : null;
  return (
    <a className={`rcard ${rank ? 'rank' : ''}`} href={`/${e.slug}/`}>
      <div className="thumb" style={{ background: e.poster?.gradient }}>
        {openTag && <span className="open-tag">{openTag}</span>}
        {e.shortName || e.name}
        {rank && <span className="no">{rank}</span>}
      </div>
      <div className="rt">{e.name}</div>
      <div className="rd num"><em>{e.region}</em>{dots(e.dateStart)} ~ {dots(e.dateEnd)}{low ? ` · ${won(low)}~` : ''}</div>
    </a>
  );
}

export default function Home() {
  const all = getAllEvents();
  const now = new Date();
  const booking = all.filter((e) => e.category !== '축제');
  const festivals = all.filter((e) => e.category === '축제');
  const opening = booking
    .filter((e) => e.booking?.openAt && new Date(e.booking.openAt) >= now)
    .sort((a, b) => new Date(a.booking.openAt) - new Date(b.booking.openAt));
  const hero = all.slice(0, 3);

  return (
    <main className="wrap">
      {/* 1. 상단 대형 배너 — 오늘 오픈·랭킹 상위 */}
      <div className="home-hero">
        {hero[0] && (
          <a className="hero-card" href={`/${hero[0].slug}/`} style={{ background: hero[0].poster?.gradient }}>
            <span className="hbtn">티켓 예매하기</span>
            <div>
              <div className="hk">{hero[0].category.toUpperCase()} · {hero[0].region}</div>
              <h2>{hero[0].name}</h2>
              <div className="hd num">{dots(hero[0].dateStart)} ~ {dots(hero[0].dateEnd)} · {hero[0].venue}</div>
            </div>
          </a>
        )}
        <div className="hero-side">
          {hero.slice(1, 3).map((e) => (
            <a className="hero-card" key={e.slug} href={`/${e.slug}/`} style={{ background: e.poster?.gradient }}>
              <div><div className="hk">{e.category}</div><h2>{e.name}</h2><div className="hd num">{dots(e.dateStart)} ~ {dots(e.dateEnd)}</div></div>
            </a>
          ))}
          {hero.length < 3 && <div className="empty">수집되는 공연이 늘어나면 여기에 채워집니다</div>}
        </div>
      </div>

      {/* 2. 카테고리 칩 */}
      <div className="chips">
        {CATS.map((c) => <a className="chip" key={c} href={`/?cat=${encodeURIComponent(c)}`}><i>{INITIAL[c]}</i>{c}</a>)}
      </div>

      {/* 3. 오늘 티켓오픈 */}
      <section className="sec">
        <h2>티켓 오픈 예정 <small>오픈 시각 순</small></h2>
        {opening.length ? (
          <div className="row-scroll">
            {opening.map((e) => <Card key={e.slug} e={e} openTag={`${dday(e.booking.openAt)} · ${new Date(e.booking.openAt).toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour: 'numeric', minute: '2-digit' })}`} />)}
          </div>
        ) : <div className="empty">오픈 예정인 공연이 없습니다</div>}
      </section>

      <div className="ad-slot">AD</div>

      {/* 4. 주간 랭킹 */}
      <section className="sec">
        <h2>주간 랭킹 <small>예매처 랭킹 기준</small></h2>
        <div className="row-scroll">
          {booking.slice(0, 10).map((e, i) => <Card key={e.slug} e={e} rank={i + 1} />)}
        </div>
      </section>

      {/* 5. 이번 주말 축제 — 현장형 템플릿 입구 */}
      <section className="sec fest">
        <h2>이번 주말 축제·행사 <small>야간 개장 · 불꽃놀이 · 빛축제</small></h2>
        {festivals.length ? (
          <div className="rgrid">{festivals.slice(0, 4).map((e) => <Card key={e.slug} e={e} />)}</div>
        ) : <div className="empty">축제·행사 페이지는 현장형 템플릿이 들어오면 여기에 표시됩니다</div>}
      </section>
    </main>
  );
}
