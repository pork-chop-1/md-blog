'use client'

import { useEffect, useRef } from 'react'
// import './love'

export default function FeatureTest() {
  const ref = useRef<HTMLCanvasElement>(null)
  const CIRCLE_WIDTH = 30

  console.log('effect')
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const x = e.pageX,
      y = e.pageY
    console.log(x, y)
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) {
      return
    }
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    touchStart(ctx, x, y)
    const cursorMove = (e: MouseEvent) => {
      const x = e.offsetX,
        y = e.offsetY
      moving(ctx, x, y)
    }
    const cursorDone = (e: MouseEvent) => {
      const x = e.offsetX,
        y = e.offsetY
      // moving(ctx, x, y)
      document.removeEventListener('mousedown', cursorMove)
      document.removeEventListener('mouseup', cursorDone)
    }

    document.addEventListener('mousemove', cursorMove)
    document.addEventListener('mouseup', cursorDone)
  }

  function touchStart(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath()
    ctx.strokeStyle = '#000'
    ctx.moveTo(x, y)
    ctx.arc(x, y, CIRCLE_WIDTH, 0, 2 * Math.PI)
    ctx.stroke()
  }

  function moving(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  return (
    <>
      <canvas
        ref={ref}
        className="w-screen h-screen"
        onMouseDown={onMouseDown}
      ></canvas>
    </>
  )
}

// https://www.npmjs.com/package/react-live
// https://github.com/react-simple-code-editor/react-simple-code-editor/blob/main/example/App.tsx
