import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'data', 'events');

/** data/events/*.json → 공연 목록 (updatedAt 최신순) */
export function getAllEvents() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
    .filter((e) => e.slug && e.title)
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
}

export function getEvent(slug) {
  return getAllEvents().find((e) => e.slug === slug) || null;
}

export const won = (n) => Number(n).toLocaleString('ko-KR') + '원';

const DOW = ['일', '월', '화', '수', '목', '금', '토'];

/** "2026-12-11" → { md: "12.11", dow: "금요일" } */
export function splitDate(iso) {
  const d = new Date(iso + 'T00:00:00+09:00');
  return { md: `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, '0')}`, dow: DOW[d.getDay()] + '요일' };
}

export const dots = (iso) => iso.replaceAll('-', '.');

/** 일반 예매 오픈까지 남은 날 — 빌드 시점(KST) 기준 */
export function dday(openAt) {
  const diff = Math.ceil((new Date(openAt) - new Date()) / 86400000);
  return diff > 0 ? `D-${diff}` : diff === 0 ? 'D-DAY' : '오픈';
}

/** 타임라인 상태 — 빌드 시점 기준 (수집이 매일 돌며 다시 빌드한다) */
export function phase(item) {
  const now = new Date();
  if (now > new Date(item.end)) return 'done';
  if (now >= new Date(item.start)) return 'now';
  return 'wait';
}
