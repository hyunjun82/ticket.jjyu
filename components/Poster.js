/**
 * 포스터 슬롯. public/posters/ 에 공식 포스터 파일이 있으면 그 이미지,
 * 없으면 타이포 포스터(그라데이션 + 공연명)로 표시한다.
 * 이미지 파일 존재 여부는 빌드 시 scripts/verify.mjs 가 확인한다.
 */
export default function Poster({ poster, name, dates, venue, hasImage }) {
  const lines = String(poster?.headline || name).split('\n');
  return (
    <div className="poster" style={{ background: poster?.gradient }}>
      {hasImage && <img className="p-img" src={poster.src} alt={`${name} 공식 포스터`} />}
      <div className="p-top">{poster?.eyebrow || ''}</div>
      <div className="p-title">
        {lines.map((l, i) => (
          <span key={i}>{l}{i < lines.length - 1 && <br />}</span>
        ))}
      </div>
      <div className="p-sub">{dates}<br />{venue}</div>
    </div>
  );
}
