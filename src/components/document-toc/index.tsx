'use client'

import remarkParse from 'remark-parse'
import { unified } from 'unified'
import GithubSlugger, { slug } from 'github-slugger'
import { toString } from 'hast-util-to-string'
import _ from 'lodash-es'

import TocItem from './toc-item'
import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export type headingType = {
  title: string,
  id: string,
  level: number,
  active: string | null,
  children: headingType[]
}

const slugs = new GithubSlugger()

export default function DocumentToc({ content }: { content: string }) {
  slugs.reset()
  const res = unified().use(remarkParse).parse(content)


  const headingList: headingType[] = res.children
    .filter((v) => v.type === 'heading')
    .map((v) => {
      // @ts-expect-error type not match
      const content = toString(v)
      return {
        title: content,
        id: slugs.slug(content),
        // @ts-expect-error heading ast node contains depth
        level: v.depth,
        active: null,
        children: []
      }
    })
    .filter((v) => [2, 3, 4].indexOf(v.level) !== -1)

  let listNest: headingType[] = []
  if (headingList.length > 1) {

    let before = headingList[0]
    let parentStack: headingType[] = []

    for (let i = 0; i < headingList.length; i++) {
      const current = headingList[i]
      if(current.level <= before.level) {
        // 出栈
        parentStack.length = parentStack.length - (before.level - current.level)
        if(parentStack.length != 0) {
          parentStack[parentStack.length - 1].children.push(current)
        } else {
          listNest.push(current)
        }
      } else {
        // 只限一级一级层叠进入菜单，跳级菜单忽略
        if(current.level - before.level === 1) {
          before.children.push(current)
          parentStack.push(before)
        }
      }
      before = current
    }
  } else {
    listNest = headingList
  }

  const [active, setActive] = useState<string | null>(null)
  const headers = useRef<NodeListOf<HTMLElement> | null>(null)
  // 获取滚动到的标题位置
  typeof window !== "undefined" && window.addEventListener(
    'scroll',
    _.throttle((e) => {
      if (headers.current == null) {
        headers.current = document.querySelectorAll(
          '#article-rendered .header-creator',
        )
      }
      if (!headers.current) {
        return
      }
      const list = headers.current
      // const headers = document.querySelectorAll('#article-rendered .header-creator')
      let activeId = null
      for (let i = 0; i < list.length; i++) {
        if (list[i].getBoundingClientRect().top >= 0) {
          activeId = list[i].getAttribute('id')
          break
        }
      }
      setActive(activeId)
    }, 200),
  )

  const wrapper = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollToPlugin)
    }, wrapper)
  }, [])

  function ItemClickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute('href') || ''
    gsap.to(window, {duration: 0.5, scrollTo:{y:href, offsetY:0}});
  }

  return (
    <div className="document-toc-container flex flex-col" ref={wrapper}>
      <h2 className="mb-4 text-xl">In this article</h2>
      <ul className="h-full">
        {listNest.map((v, i) => (
          <li key={v.title}>
            <TocItem
              id={`${v.id}`}
              level={v.level}
              active={active}
              subList={v.children}
              onClick={ItemClickHandler}
            >
              {v.title}
            </TocItem>
          </li>
        ))}
      </ul>
    </div>
  )
}
