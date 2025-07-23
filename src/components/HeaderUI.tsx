export default function HeaderUI() {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🌤️ Dashboard Meteorológico
          </h1>
          <p style={{
            fontSize: '1.125rem',
            fontStyle: 'italic',
            fontWeight: 500,
            letterSpacing: '0.05em',
            lineHeight: '1.6',
            paddingLeft: '1rem',
            borderLeft: '4px solid rgba(51, 65, 85, 0.3)',
          }}>
            Información climática en tiempo real ✨
          </p>
        </div>
      </div>
    </div>
  );
}
