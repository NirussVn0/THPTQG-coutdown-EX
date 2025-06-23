import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '3px solid #e5e7eb',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 2,
              height: 30,
              background: '#374151',
              top: 30,
              left: '50%',
              transformOrigin: 'bottom',
              transform: 'translateX(-50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 3,
              height: 20,
              background: '#ef4444',
              top: 40,
              left: '45%',
              transformOrigin: 'bottom',
              transform: 'translateX(-50%) rotate(-30deg)',
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              background: '#374151',
              borderRadius: '50%',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 20,
            fontSize: 40,
          }}
        >
          🎓
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
