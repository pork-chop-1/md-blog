'use client'

import { useEffect, useRef, useState } from 'react'
import { headingType } from '..'
import styles from './index.module.scss'
import gsap from 'gsap'

export default function TocItem({
  children,
  id,
  level,
  onClick,
  active,
  subList,
}: {
  children: string
  id: string
  level: number
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  active: string | null
  subList: headingType[]
}) {
  const idWithPrefix = `${process.env.NEXT_PUBLIC_ID_PREFIX}${id}`
  const href = `#${idWithPrefix}`

  function anchorTitle(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()

    onClick && onClick(e)
  }

  const [isExpand, setIsExpand] = useState(false)
  const subMenuRef = useRef<null | HTMLUListElement>(null)
  function expandBtnHandler() {
    setIsExpand(!isExpand)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // console.log('animate!', subMenuRef.current?.scrollHeight, isExpand)
      if (!isExpand) {
        gsap.to(subMenuRef.current, { height: 0, duration: 0.2 })
      } else {
        gsap.to(subMenuRef.current, { height: 'auto', duration: 0.2 })
      }
    }, subMenuRef)

    // return () => ctx.revert()
  }, [isExpand])

  useEffect(() => {
    if (active === idWithPrefix && active != null) {
      setIsExpand(true)
    }
  }, [active])

  const expandBtn =
    subList.length > 0 ? (
      <button
        className={`${styles['expand-btn']} ${
          isExpand ? styles['expand'] : ''
        }`}
        onClick={expandBtnHandler}
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
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    ) : (
      <></>
    )

  return (
    <>
      <div
        className={`relative flex border-l-2 items-center justify-between w-full cursor-pointer ${
          active === idWithPrefix
            ? 'border-sky-500 bg-sky-100 font-bold'
            : 'border-gray-200'
        } `}
      >
        <a
          className={`flex relative py-2 px-4 w-full hover:text-blue-300`}
          href={href}
          onClick={anchorTitle}
        >
          {children}
        </a>
        {expandBtn}
      </div>
      <ul
        className={`${styles['sub-menu-wrapper']}  ${
          isExpand ? '' : styles['close']
        }`}
        ref={subMenuRef}
      >
        {subList.map((v) => (
          <TocItem
            id={`${v.id}`}
            level={v.level}
            active={active}
            subList={v.children}
            key={v.id}
            onClick={onClick}
          >
            {v.title}
          </TocItem>
        ))}
      </ul>
    </>
  )
}
