export default function NotFound() {
  return (
    <main className="wrap" style={{ padding: '80px 16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 24 }}>찾는 공연 페이지가 없습니다</h1>
      <p style={{ color: 'var(--fg2)' }}>공연이 종료됐거나 주소가 바뀌었을 수 있습니다.</p>
      <a className="btn btn-primary" href="/">홈으로</a>
    </main>
  );
}
