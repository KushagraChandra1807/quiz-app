import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const blobs = el.querySelectorAll('.blob')
    blobs.forEach((b, i) => {
      gsap.to(b, {
        duration: 8 + i * 2,
        x: (i % 2 === 0 ? -40 : 40),
        y: (i % 2 === 0 ? 20 : -20),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])
  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg className="blob" width="400" height="400" style={{ position: 'absolute', left: '-80px', top: '-40px', opacity: 0.12 }}>
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#g1)" />
      </svg>

      <svg className="blob" width="320" height="320" style={{ position: 'absolute', right: '-60px', bottom: '-80px', opacity: 0.10 }}>
        <circle cx="160" cy="160" r="140" fill="#06b6d4" />
      </svg>
    </div>
  )
}
