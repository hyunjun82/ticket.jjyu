// 외부 링크 → 내부 이동 페이지(/go/{id}/). 버튼은 사이트 안 페이지를 먼저 거치고(전면광고가 뜰 수 있는 사이트 안 이동) 거기서 예매처로 간다.
import crypto from 'node:crypto';
import { getAllEvents } from './events';
export const goId = (url) => crypto.createHash('sha1').update(url).digest('hex').slice(0, 10);
export const goHref = (url) => (/^https?:\/\//.test(url || '') ? `/go/${goId(url)}/` : url);
let cache = null;
export function getAllGo() {
  if (cache) return cache;
  const map = new Map();
  const add = (e, url, label, sub, where) => { if (!/^https?:\/\//.test(url || '')) return; const id = goId(url); if (!map.has(id)) map.set(id, { id, url, label, sub, from: e.slug, fromName: e.shortName || e.name, where }); };
  for (const e of getAllEvents()) {
    if (e.booking?.url) add(e, e.booking.url, e.booking.vendor === '공식 안내' ? '공식 안내 보기' : '티켓 예매하기', e.booking.vendor, '예매');
    (e.related || []).forEach((r) => !r.slug && r.url && add(e, r.url, r.name, '', '관련'));
    (e.links || []).forEach((l) => add(e, l.url, l.label, '', '공식'));
  }
  cache = [...map.values()]; return cache;
}
export const getGo = (id) => getAllGo().find((g) => g.id === id) || null;
export function hostLabel(url) {
  const h = new URL(url).hostname;
  if (/ticketlink/.test(h)) return '티켓링크'; if (/interpark|nol/.test(h)) return 'NOL 티켓'; if (/yes24/.test(h)) return '예스24';
  if (/melon/.test(h)) return '멜론티켓'; return h.replace(/^www\./, '');
}
