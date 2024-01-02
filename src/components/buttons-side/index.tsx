'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

export default function ButtonsSide() {
  const [percentage, setPercentage] = useState<string | number>('· · ·')
  const component = useRef(null)
  const [circleDash, setCircleDash] = useState('0 151')

  // https://gsap.com/docs/v3/GSAP/gsap.context()#react-demo
  useEffect(() => {
    const ctx = gsap.context(() => {
      // https://gsap.com/community/forums/topic/35440-warning-extra-attributes-from-the-server-style/
      // put register in useEffect
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.create({
        trigger: '#header',
        onUpdate: (self) => {
          const percent = Math.round(self.progress * 100)
          setPercentage(percent === 0 ? '· · ·' : percent)
          setCircleDash(Math.round(self.progress * 151) + 'px 151px')
        },
      })
    }, component)

    // React 18 strict mode calls twice
    return () => ctx.revert()
  }, [])

  const [expend, setExpend] = useState(false)

  function goTop() {
    gsap.to(window, { duration: 0.5, scrollTo: 0 });
  }

  function goBottom() {
    gsap.to(window, { duration: 0.5, scrollTo: 'max' });
  }

  return (
    <div
      className="fixed right-8 bottom-8 [&>button]:transition-all duration-1000"
      ref={component}
    >
      <button
        id="up-btn"
        onClick={goTop}
        className={`${styles.button} z-[1] ${expend ? 'bottom-20 right-0' : 'bottom-0 right-0'} `}
      >
        ↑
      </button>
      <button
        id="down-btn"
        onClick={goBottom}
        className={`${styles.button} z-[1] ${expend ? 'bottom-16 right-16' : 'bottom-0 right-0'}`}
      >
        ↓
      </button>
      <button
        id="search-btn"
        className={`${styles.button} z-[1] ${expend ? 'right-20 bottom-0' : 'right-0 bottom-0'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
      <svg className="absolute w-12 h-12 right-0 bottom-0 z-[4] scale-125">
        <circle cx="50%" cy="50%" r="49%" style={{stroke: 'rgb(2 132 199)', fill: 'none'}} strokeDasharray={circleDash}></circle>
      </svg>
      <div className={`${styles.button} z-[5] right-0 bottom-0`} onClick={() => setExpend(!expend)}>
        {percentage}
      </div>
    </div>
  )
}
