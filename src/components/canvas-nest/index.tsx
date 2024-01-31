'use client'

import { ReactElement, useEffect } from 'react'

const config = {
  color: '0,0,0',
  count: 18,
  zIndex: 0,
}

// Using config rendering effect at 'element'.

export function CanvasNest({
  children,
}: {
  children?: ReactElement<HTMLElement>
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // post-wrapper
      const CanvasNestJS = require('canvas-nest.js')
      const cn = new CanvasNestJS(
        document.querySelector('#nest-wrapper'),
        config,
      )

      return () => cn.destroy()
    }
  }, [])
  return (
    <div
      id={'nest-wrapper'}
      className="h-full w-full bg-transparent"
    >
      {children}
    </div>
  )
}