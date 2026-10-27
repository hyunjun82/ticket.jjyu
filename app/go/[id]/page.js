import { getAllGo, getGo, hostLabel } from '../../../lib/go';
import { getEvent } from '../../../lib/events';
import AdSlot from '../../../components/AdSlot';
export function generateStaticParams() { return getAllGo().map((g) => ({ id: g.id })); }
export async function generateMetadata({ params }) { const { id } = await params; const g = getGo(id); if (!g) return {}; return { title: `${g.fromName} · ${hostLabel(g.url)}로 이동`, robots: { index: false, follow: false } }; }
export default async function GoPage({ params }) {
  const { id } = await params; const g = getGo(id); if (!g) return null;
  const e = getEvent(g.from);
  return (
    <main className="wrap gopage">
      <div className="gocard">
        <div className="l">{hostLabel(g.url)} 공식 예매처로 이동합니다</div>
        <h1>{g.fromName}</h1>
        <div className="s">{g.label}{g.sub ? ` · ${g.sub}` : ''}</div>
        <a className="btn btn-primary" href={g.url} rel="noopener">지금 바로 이동</a>
        <div className="cnt">위 버튼을 누르면 공식 페이지로 이동합니다 · <a href={`/${g.from}/`}>{g.fromName} 페이지로 돌아가기</a></div>
        <div className="u">{g.url}</div>
      </div>
      <AdSlot />
      {e && <p className="cta-note" style={{ textAlign: 'center', marginTop: 24 }}>TICKETDAY는 공식 예매처 주소를 안내할 뿐이며 티켓 판매·결제는 {hostLabel(g.url)}에서 이루어집니다.</p>}
    </main>
  );
}
