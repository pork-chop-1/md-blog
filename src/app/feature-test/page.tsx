'use client'

import { useEffect, useRef } from 'react'
// import './love'

export default function FeatureTest() {
  const ref = useRef<HTMLCanvasElement>(null)
  const CIRCLE_WIDTH = 20

  console.log('effect')

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) {
      return
    }
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const x = e.pageX,
      y = e.pageY
    console.log(x, y)
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) {
      return
    }
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    // canvas.width = canvas.offsetWidth
    // canvas.height = canvas.offsetHeight
    ctx.strokeStyle = '#000'
    touchStart(ctx, x, y)
    const cursorMove = (e: MouseEvent) => {
      const x = e.offsetX,
        y = e.offsetY
      moving(ctx, x, y)
    }
    const cursorDone = (e: MouseEvent) => {
      const x = e.offsetX,
        y = e.offsetY
      // console.log(x, y, 'done')
      moving(ctx, x, y)
      document.removeEventListener('mousedown', cursorMove)
      document.removeEventListener('mouseup', cursorDone)
    }

    document.addEventListener('mousemove', cursorMove)
    document.addEventListener('mouseup', cursorDone)
  }

  function touchStart(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath()
    // ctx.arc(x, y, CIRCLE_WIDTH, 0, 2 * Math.PI)
    ctx.moveTo(x, y)
    ctx.stroke()
  }

  function moving(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // console.log(x, y)
    // ctx.beginPath()
    ctx.lineTo(x, y)
    ctx.moveTo(x, y)
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
