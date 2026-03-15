import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#003057', // GT Navy
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#EAAA00', // GT Gold
          borderRadius: '6px',
          fontWeight: '900',
          fontFamily: 'sans-serif',
        }}
      >
        U
      </div>
    ),
    { ...size }
  )
}
