'use client';
import { useEffect, useState } from 'react';
export default function Go({ url }) {
  const [n, setN] = useState(3);
  useEffect(() => { if (n <= 0) { window.location.href = url; return; } const t = setTimeout(() => setN(n - 1), 1000); return () => clearTimeout(t); }, [n, url]);
  return <span className="num">{n}초 뒤 자동 이동</span>;
}
