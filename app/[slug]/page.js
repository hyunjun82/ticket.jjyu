import { av } from '../../lib/avif';
import fs from 'node:fs';
import path from 'node:path';
import { getAllEvents, getEvent, won, splitDate, dots, dday } from '../../lib/events';
import Poster from '../../components/Poster';
import LiveBits from '../../components/LiveBits';
import AdSlot from '../../components/AdSlot';
import { goHref } from '../../lib/go';

const SITE_URL = 'https://ticket.jjyu.co.kr';

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  const low = e.seats?.length ? Math.min(...e.seats.map((s) => s.price)) : null;
  return {
    title: e.title,
    description: `${e.name} — ${e.venue}, ${dots(e.dateStart)}~${dots(e.dateEnd)}.${low ? ` ${won(low)}부터.` : ''} 예매 오픈 일정, 좌석 가격, 선예매 조건, 취소 기준을 ${e.booking?.vendor || '공식 예매처'} 기준으로 정리했습니다.`,
    alternates: { canonical: `/${e.slug}/` },
    openGraph: { title: e.title, description: `${e.name} · ${e.venue}`, type: 'article' },
  };
}

const Html = ({ as: Tag = 'p', className, html }) => <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;

export default async function EventPage({ params }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return null;

  const free = e.booking?.vendor === '공식 안내';
  const ctaLabel = free ? '공식 안내 보기' : e.booking.status === '예매대기' ? '예매대기 · 잔여석 확인' : e.booking.status === '매진' ? '잔여석 확인하기' : '티켓 예매하기';
  const hasImage = !!e.poster?.src && fs.existsSync(path.join(process.cwd(), 'public', e.poster.src));
  const low = e.seats?.length ? Math.min(...e.seats.map((s) => s.price)) : null;
  const s = splitDate(e.dateStart), en = splitDate(e.dateEnd);
  const dateLabel = `${e.dateStart.slice(0, 4)}.${s.md} (${s.dow[0]}) – ${en.md} (${en.dow[0]})`;
  const tabs = [...e.sections.map((x) => ({ id: x.id, tab: x.tab })), ...(e.faq?.length ? [{ id: 'faq', tab: '자주 묻는 질문' }] : [])];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: e.name,
        startDate: e.dateStart,
        endDate: e.dateEnd,
        eventStatus: 'https://schema.org/EventScheduled',
        location: { '@type': 'Place', name: e.venue, address: e.region },
        organizer: { '@type': 'Organization', name: e.organizer },
        offers: (e.seats || []).map((st) => ({
          '@type': 'Offer', name: st.grade, price: st.price, priceCurrency: 'KRW', url: e.booking?.url,
          availability: 'https://schema.org/PreOrder', validFrom: e.booking?.openAt,
        })),
      },
      e.faq?.length && {
        '@type': 'FAQPage',
        mainEntity: e.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: e.category, item: `${SITE_URL}/?cat=${encodeURIComponent(e.category)}` },
          { '@type': 'ListItem', position: 3, name: e.shortName || e.name },
        ],
      },
    ].filter(Boolean),
  };

  return (
    <main className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LiveBits openAt={e.booking?.openAt} />
      <div className="crumb"><span>홈</span><span>›</span><span>{e.category}</span>{e.subCategory && <><span>›</span><span>{e.subCategory}</span></>}</div>

      <div className="hero">
        <Poster poster={e.poster} name={e.name} dates={dateLabel} venue={e.venue} hasImage={hasImage} />
        <div className="info">
          <div className="badges">
            <span className="badge cat">{e.category}</span>
            {(e.badges || []).map((b, i) => <span key={b} className={`badge ${i === 0 ? 'ex' : 'line'}`}>{b}</span>)}
            {e.rating && <span className="badge line">{e.rating}</span>}
          </div>
          <h1>{e.title}</h1>
          <div className="sub-title">{e.name}</div>
          <Html className="intro" html={e.intro} />
          <div className="cta-row">
            <a className="btn btn-primary" href={goHref(e.booking.url)}>{ctaLabel}</a>
            <a className="btn btn-ghost" href={`#${e.sections[0].id}`}>{e.sections[0].tab} 보기</a>
            {(e.links || []).map((l) => <a key={l.url} className="btn btn-ghost" href={goHref(l.url)}>{l.label}</a>)}
            <span className="cta-note">{free ? '입장권 예매 없이 주최 측 공식 안내를 따릅니다' : `예매는 공식 예매처 ${e.booking.vendor}에서 진행됩니다${e.booking.fee ? ` · 예매수수료 장당 ${won(e.booking.fee)}` : ''}`}</span>
          </div>
          <dl className="meta">
            <dt>장소</dt><dd><b>{e.venue}</b></dd>
            <dt>기간</dt><dd className="num">{dots(e.dateStart)} ~ {dots(e.dateEnd)}</dd>
            <dt>관람등급</dt><dd>{e.rating}</dd>
            {e.seats?.length > 0 && <><dt>가격</dt><dd className="num">{e.seats.map((st) => `${st.grade} ${won(st.price)}`).join(' · ')}</dd></>}
            <dt>주최/기획</dt><dd>{e.organizer}</dd>
            <dt>문의</dt><dd className="num">{e.contact}</dd>
          </dl>
        </div>
      </div>

      <div className="panel-grid">
        <div className="card">
          <h3>{e.category === '축제' || e.category === '전시' ? '관람 회차' : '공연 회차'}</h3>
          <div className="rounds">
            {e.rounds.map((r) => {
              const d = splitDate(r.date);
              return (
                <div className="round" key={r.date + r.time}>
                  <div className="d num">{d.md}<small>{d.dow}</small></div>
                  <div className="t">{r.time}</div>
                  <span className={`pill ${r.status === '예매중' ? 'ok' : r.status === '매진' ? 'soldout' : r.status === '종료' ? 'done' : 'wait'}`}>{r.status}</span>
                </div>
              );
            })}
          </div>
          {e.booking?.openAt && new Date(e.booking.openAt) > new Date()
            ? <div className="dday"><span>일반 예매 오픈까지</span><b id="dday" className="num">{dday(e.booking.openAt)}</b></div>
            : <div className="dday"><span>{e.booking.vendor} 예매 상태</span><b className="num" style={{ color: e.booking.status === '매진' || e.booking.status === '예매대기' ? 'var(--fg2)' : 'var(--ok)' }}>{e.booking.status || '예매중'}</b></div>}
        </div>
        <div className="card">
          <h3>예매·행사 일정</h3>
          <ul className="timeline" id="timeline">
            {e.timeline.map((t) => (
              <li key={t.label} data-start={t.start} data-end={t.end}>
                <span className="dot" /><span className="l">{t.label}<small>{t.detail}</small></span><span className="pill wait">예정</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AdSlot />

      <nav className="tabs" id="tabs">
        {tabs.map((t, i) => <a key={t.id} href={`#${t.id}`} className={i === 0 ? 'on' : ''}>{t.tab}</a>)}
      </nav>

      <article className="article">
        {e.sections.map((sec, i) => (
          <div key={sec.id}>
            <section className="block" id={sec.id}>
              <h2>{sec.heading}</h2>
              <p className="lead">{sec.lead}</p>
              {sec.seatGrid && e.seats?.length > 0 && (
                <div className="seat">
                  {e.seats.map((st) => (
                    <div key={st.grade}>
                      <div className="g"><i style={{ background: st.color }} />{st.grade}</div>
                      <div className="pr num">{won(st.price)}<small>{e.booking.fee ? `수수료 포함 ${won(st.price + e.booking.fee)}` : ''}</small></div>
                    </div>
                  ))}
                </div>
              )}
              {(sec.paragraphs || []).map((p, j) => <Html key={j} html={p} />)}
              {sec.images?.length > 0 && (
                <div className={`figs n${Math.min(sec.images.length, 3)}`}>
                  {sec.images.map((im) => <figure key={im.src}><img src={av(im.src)} alt={im.alt || im.cap} loading="lazy" /><figcaption>{im.cap}{im.credit ? <span>사진 · {im.credit}</span> : null}</figcaption></figure>)}
                </div>
              )}
              {sec.table && (
                <div className="table-wrap"><table>
                  <thead><tr>{sec.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{sec.table.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <Html as="td" key={k} className={k === 1 ? 'num' : ''} html={c} />)}</tr>)}</tbody>
                </table></div>
              )}
              {sec.steps && (
                <ol className="steps">
                  {sec.steps.map((st) => <li key={st.title}><div><b>{st.title}</b><small>{st.detail}</small></div></li>)}
                </ol>
              )}
              {sec.cancel && (
                <div className="cancel">
                  {sec.cancel.map((c) => <div key={c.when} className={c.tone}><span>{c.when}</span><span>{c.what}</span></div>)}
                </div>
              )}
              {(sec.after || []).map((p, j) => <Html key={j} html={p} />)}
              {sec.note && (
                <div className="note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 8v4m0 4h.01" /></svg>
                  <span>{sec.note}</span>
                </div>
              )}
            </section>
            {i === 1 && <AdSlot />}
          </div>
        ))}
        {e.faq?.length > 0 && (
          <section className="block" id="faq" style={{ borderBottom: 0 }}>
            <h2>자주 묻는 질문</h2>
            <div className="faq">
              {e.faq.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </section>
        )}
      </article>

      <AdSlot />

      {e.related?.length > 0 && (
        <section className="related">
          <h2>함께 보는 공연 <small>같은 시기 공연·행사</small></h2>
          <div className="rgrid">
            {e.related.map((r) => (
              <a className="rcard" key={r.name} href={r.slug ? `/${r.slug}/` : goHref(e.booking.url)}>
                <div className="thumb" style={{ background: r.gradient }}>
                  {r.slug && fs.existsSync(path.join(process.cwd(), 'public', 'posters', r.slug + '.jpg')) ? <img src={av(`/posters/${r.slug}.jpg`)} alt={r.name} loading="lazy" /> : <span className="tt">{r.name}</span>}
                </div>
                <div className="rt">{r.name}</div>
                <div className="rd num"><em>{r.region}</em>{r.dates}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      <p className="cta-note" style={{ padding: '0 0 24px' }}>출처 {e.source} · {e.checkedAt} 확인</p>

      <div className="stickybar">
        <div className="pr">{low ? <>{e.seats.find((x) => x.price === low).grade}부터<b className="num">{won(low)}</b></> : <b>{free ? '무료 · 공식 안내' : e.booking.vendor}</b>}</div>
        <a className="btn btn-primary" href={goHref(e.booking.url)}>{ctaLabel}</a>
      </div>
    </main>
  );
}
