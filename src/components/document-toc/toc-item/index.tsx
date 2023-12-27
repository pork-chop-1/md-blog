'use client'

import gsap from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin)

export default function TocItem({
  children,
  href,
  level,
  onClick
}: {
  children: string
  href: string,
  level: number,
  onClick: () => void
}) {
  function anchorTitle(e: React.MouseEvent<HTMLAnchorElement>) {
    // e.preventDefault()

    // const href = e.currentTarget.getAttribute('href') || ''
    // location.hash = href

    onClick()
  }

  return (
    <a
      href={href}
      onClick={anchorTitle}
    >
      {children}
    </a>
  )
}
