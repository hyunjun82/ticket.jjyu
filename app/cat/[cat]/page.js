import fs from 'node:fs';
import path from 'node:path';
import { getAllEvents, won, dots } from '../../../lib/events';
import { CATS, catName, catHref } from '../../../lib/cats';
import CategoryIcons from '../../../components/CategoryIcons';
import AdSlot from '../../../components/AdSlot';
const img = (e) => (e.poster?.src && fs.existsSync(path.join(process.cwd(), 'public', e.poster.src)) ? e.poster.src : null);
export function generateStaticParams() { return [...CATS.map(([, s]) => ({ cat: s })), { cat: 'all' }]; }
export async function generateMetadata({ params }) { const { cat } = await params; const name = catName(cat) || '전체'; return { title: `${name} 티켓 예매 일정·가격 모음`, description: `${name} 공연의 티켓 오픈 일정, 좌석 가격, 공식 예매처를 한눈에 봅니다.`, alternates: { canonical: `/cat/${cat}/` } }; }
export default async function CatPage({ params }) {
  const { cat } = await params; const name = catName(cat);
  const list = getAllEvents().filter((e) => !name || e.category === name);
  return (
    <main className="wrap">
      <div className="crumb"><a href="/">홈</a><span>›</span><span>{name || '전체'}</span></div>
      <CategoryIcons active={name} />
      <section className="sec">
        <h2>{name || '전체'} <small>{list.length}건 · 최근 업데이트 순</small></h2>
        {list.length ? (
          <div className="catgrid">{list.map((e) => { const low = e.seats?.length ? Math.min(...e.seats.map((s) => s.price)) : null; return (
            <a className="rcard" key={e.slug} href={`/${e.slug}/`}>
              <div className="thumb" style={{ background: e.poster?.gradient }}>{img(e) ? <img src={img(e)} alt={e.name} loading="lazy" /> : <span className="tt">{e.shortName || e.name}</span>}{(e.booking?.status === '매진' || e.booking?.status === '예매대기') && <span className="sold">{e.booking.status}</span>}</div>
              <div className="rt">{e.name}</div>
              <div className="rd num"><em>{e.region}</em>{dots(e.dateStart)} ~ {dots(e.dateEnd)}{low ? ` · ${won(low)}~` : ''}</div>
            </a>); })}</div>
        ) : <div className="empty">{name} 공연이 아직 없습니다. 수집되는 대로 채워집니다.</div>}
      </section>
      <AdSlot />
      <nav className="catnav">{CATS.map(([n]) => <a key={n} href={catHref(n)} className={n === name ? 'on' : ''}>{n}</a>)}</nav>
    </main>
  );
}
