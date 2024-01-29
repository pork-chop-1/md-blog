'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useGSAP } from '@gsap/react'

export default function ButtonsSide() {
  const [percentage, setPercentage] = useState<string | number>('· · ·')
  const component = useRef(null)
  const [circleDash, setCircleDash] = useState('0 151')

  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const percent = Math.round(self.progress * 100)
        setPercentage(percent === 0 ? '· · ·' : percent)
        setCircleDash(Math.round(self.progress * 151) + 'px 151px')
      },
    })
  }, {})

  const goTop = contextSafe(() => {
    gsap.to(window, { duration: 0.5, scrollTo: 0 })
  })

  return (
    <div
      className="fixed right-8 bottom-8 [&>button]:transition-all duration-1000"
      ref={component}
    >
      <svg className="absolute w-12 h-12 right-0 bottom-0 z-[4] scale-125">
        <circle
          cx="50%"
          cy="50%"
          r="49%"
          style={{ stroke: 'rgb(2 132 199)', fill: 'none' }}
          strokeDasharray={circleDash}
        ></circle>
      </svg>
      <div
        className={`flex ${styles.button} z-[5] right-0 bottom-0 relative group`}
      >
        {percentage}
        <div
          className={`${styles.button} absolute inset-0 hidden group-hover:flex`}
          onClick={goTop}
        >
          ↑
        </div>
      </div>
    </div>
  )
}
