// 발행 점검 — 빌드 전에 데이터가 깨졌는지, 지어낸 값이 섞였는지 막는다.
import fs from 'node:fs';
import path from 'node:path';
const dir = path.join(process.cwd(), 'data', 'events');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
let bad = 0;
const need = ['slug', 'type', 'category', 'title', 'name', 'venue', 'region', 'dateStart', 'dateEnd', 'booking', 'rounds', 'sections', 'source', 'checkedAt'];
for (const f of files) {
  const e = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const miss = need.filter((k) => e[k] === undefined || e[k] === '');
  if (miss.length) { console.error(`${f}: 필수 항목 없음 → ${miss.join(', ')}`); bad++; }
  if (e.slug !== f.replace('.json', '')) { console.error(`${f}: slug 와 파일명이 다름`); bad++; }
  if (!/^https?:\/\//.test(e.booking?.url || '')) { console.error(`${f}: 예매 URL 없음`); bad++; }
  if (e.title && e.title.length > 40) console.warn(`${f}: 타이틀 ${e.title.length}자 — 40자 넘음`);
  // 타이틀의 세부 키워드가 소제목 순서와 맞는지는 사람이 본다. 소제목 수만 확인.
  if ((e.sections || []).length < 3) { console.error(`${f}: 소제목 3개 미만`); bad++; }
  if (e.poster?.src && !fs.existsSync(path.join(process.cwd(), 'public', e.poster.src)))
    console.warn(`${f}: 포스터 파일 없음(${e.poster.src}) — 타이포 포스터로 표시됨`);
}
console.log(`EVENTS=${files.length} BAD=${bad}`);
if (bad) process.exit(1);
