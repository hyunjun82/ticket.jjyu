// 카테고리 ↔ 주소 슬러그. GNB·아이콘 칩·카테고리 목록 페이지가 같이 쓴다.
export const CATS = [
  ['뮤지컬', 'musical'], ['콘서트', 'concert'], ['연극', 'play'], ['전시', 'exhibition'], ['클래식', 'classic'], ['스포츠', 'sports'], ['축제', 'festival'],
];
export const catSlug = (name) => (CATS.find(([n]) => n === name) || [])[1] || 'all';
export const catName = (slug) => (CATS.find(([, s]) => s === slug) || [])[0] || null;
export const catHref = (name) => `/cat/${catSlug(name)}/`;
