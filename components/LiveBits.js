'use client';
import { useEffect } from 'react';

/**
 * 정적 페이지라 빌드 시점 값이 굳는다. 방문 시점 기준으로
 * D-day, 오픈 일정 상태(종료/진행 중/예정), 탭 활성화를 다시 계산한다.
 */
export default function LiveBits({ openAt }) {
  useEffect(() => {
    const now = new Date();
    const dd = document.getElementById('dday');
    if (dd && openAt) {
      const diff = Math.ceil((new Date(openAt) - now) / 86400000);
      dd.textContent = diff > 0 ? `D-${diff}` : diff === 0 ? 'D-DAY' : '오픈';
    }
    document.querySelectorAll('#timeline li').forEach((li) => {
      const s = new Date(li.dataset.start), e = new Date(li.dataset.end), pill = li.querySelector('.pill');
      li.classList.remove('done', 'now');
      if (now > e) { li.classList.add('done'); pill.className = 'pill done'; pill.textContent = '종료'; }
      else if (now >= s) { li.classList.add('now'); pill.className = 'pill ok'; pill.textContent = '진행 중'; }
      else { pill.className = 'pill wait'; pill.textContent = '예정'; }
    });
    const links = Array.from(document.querySelectorAll('#tabs a'));
    const secs = links.map((a) => document.querySelector(a.getAttribute('href')));
    const sync = () => {
      const y = window.scrollY + 150; let idx = 0;
      secs.forEach((s, i) => { if (s && s.offsetTop <= y) idx = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === idx));
    };
    window.addEventListener('scroll', sync, { passive: true }); sync();
    return () => window.removeEventListener('scroll', sync);
  }, [openAt]);
  return null;
}
