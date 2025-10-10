import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Krish Goswami - Web Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 20 }}>🔥</div>
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 10 }}>
          Krish Goswami
        </div>
        <div style={{ 
          fontSize: 40, 
          color: '#60efff',
          textAlign: 'center',
        }}>
          Web Developer | AI Expert | VFX Designer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
