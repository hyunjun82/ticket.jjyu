import fs from 'node:fs';
import path from 'node:path';
import { getAllEvents, won, dots, dday } from '../lib/events';
import CategoryIcons from '../components/CategoryIcons';
import AdSlot from '../components/AdSlot';

const img = (e) => (e.poster?.src && fs.existsSync(path.join(process.cwd(), 'public', e.poster.src)) ? e.poster.src : null);


export const metadata = { alternates: { canonical: '/' } };

function Card({ e, rank, openTag }) {
  const low = e.seats?.length ? Math.min(...e.seats.map((s) => s.price)) : null;
  return (
    <a className={`rcard ${rank ? 'rank' : ''}`} href={`/${e.slug}/`}>
      <div className="thumb" style={{ background: e.poster?.gradient }}>
        {img(e) ? <img src={img(e)} alt={e.name} loading="lazy" /> : <span className="tt">{e.shortName || e.name}</span>}
        {openTag && <span className="open-tag">{openTag}</span>}
        {rank && <span className="no">{rank}</span>}
        {(e.booking?.status === '매진' || e.booking?.status === '예매대기') && <span className="sold">{e.booking.status}</span>}
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
            {img(hero[0]) && <img className="hbg" src={img(hero[0])} alt="" />}
            {img(hero[0]) && <img className="hposter" src={img(hero[0])} alt={hero[0].name} />}
            <div>
              <div className="hk">{hero[0].category} · {hero[0].region}</div>
              <h2>{hero[0].name}</h2>
              <div className="hd num">{dots(hero[0].dateStart)} ~ {dots(hero[0].dateEnd)} · {hero[0].venue}</div>
              <span className="hbtn">{hero[0].booking?.status === '매진' || hero[0].booking?.status === '예매대기' ? '잔여석 확인하기' : '티켓 예매하기'}</span>
            </div>
          </a>
        )}
        <div className="hero-side">
          {hero.slice(1, 3).map((e) => (
            <a className="hero-card" key={e.slug} href={`/${e.slug}/`} style={{ background: e.poster?.gradient }}>
              {img(e) && <img className="hbg" src={img(e)} alt="" />}
              {img(e) && <img className="hposter" src={img(e)} alt={e.name} />}
              <div><div className="hk">{e.category}</div><h2>{e.shortName || e.name}</h2><div className="hd num">{dots(e.dateStart)} ~ {dots(e.dateEnd)}</div></div>
            </a>
          ))}
          {hero.length < 3 && <div className="empty">수집되는 공연이 늘어나면 여기에 채워집니다</div>}
        </div>
      </div>

      {/* 2. 카테고리 칩 */}
      <CategoryIcons />

      {/* 3. 오늘 티켓오픈 */}
      <section className="sec">
        <h2>티켓 오픈 예정 <small>오픈 시각 순</small></h2>
        {opening.length ? (
          <div className="row-scroll">
            {opening.map((e) => <Card key={e.slug} e={e} openTag={`${dday(e.booking.openAt)} · ${new Date(e.booking.openAt).toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour: 'numeric', minute: '2-digit' })}`} />)}
          </div>
        ) : <div className="empty">오픈 예정인 공연이 없습니다</div>}
      </section>

      <AdSlot />

      {/* 4. 주간 랭킹 */}
      <section className="sec">
        <h2>지금 많이 찾는 공연 <small>네이버 검색 유입 기준</small></h2>
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
