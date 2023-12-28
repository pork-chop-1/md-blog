'use client'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { headingType } from '..'
import styles from './index.module.scss'
gsap.registerPlugin(ScrollToPlugin)

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
  onClick?: () => void
  active: string
  subList: headingType[]
}) {
  function anchorTitle(e: React.MouseEvent<HTMLAnchorElement>) {
    // e.preventDefault()

    // const href = e.currentTarget.getAttribute('href') || ''
    // location.hash = href

    onClick && onClick()
  }

  const expandBtn =
    subList.length > 0 ? (
      <button className={styles['expand-btn']}></button>
    ) : (
      <></>
    )

  return (
    <>
      <a
        className={`block relative py-2 px-4 border-l-2 ${
          active === id ? 'border-sky-500 bg-sky-100 font-bold' : 'border-gray-200'
        } hover:text-blue-300`}
        id={`#${process.env.NEXT_PUBLIC_ID_PREFIX}-${id}`}
        onClick={anchorTitle}
      >
        {children}
        {expandBtn}
      </a>
      <ul className='pl-4'>
        {subList.map((v) => (
          <TocItem
            id={`${v.id}`}
            level={v.level}
            active={v.active}
            subList={v.children}
          >
            {v.title}
          </TocItem>
        ))}
      </ul>
    </>
  )
}
