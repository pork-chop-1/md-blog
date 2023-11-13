'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

import styles from './index.module.scss'

export default function CodeEditor({
  language,
  children,
  minHeight,
  maxHeight,
}: {
  language: string
  children?: string
  minHeight?: number
  maxHeight?: number
}) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeRaw)
    .use(rehypeStringify)

  const [code, setCode] = useState('')
  const [parsed, setParsed] = useState('')

  const [row, setRow] = useState(0)

  const inputAreaRef = useRef<HTMLTextAreaElement>(null)
  const showAreaRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * 输入
   */
  const textChangeHandler = (value: string) => {
    setCode(value)
    const parsedCode = processor
      .processSync(
        `\`\`\`${language}
${value}
\`\`\``,
      )
      .value.toString()
    setParsed(parsedCode)

    // check textarea rows
    setRow(value.split(/\r|\r\n|\n/).length)
  }

  useEffect(() => {
    textChangeHandler(children || '')
  }, [])

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation()
    const target = e.target as HTMLElement

    const top = target.scrollTop
    const left = target.scrollLeft
    if (inputAreaRef.current) {
      inputAreaRef.current.scrollTop = top
      inputAreaRef.current.scrollLeft = left
    }
    if (showAreaRef.current) {
      showAreaRef.current.scrollTop = top
      showAreaRef.current.scrollLeft = left
    }
  }

  /**
   * 输入后，重新渲染将重置滚动条
   * https://react.dev/reference/react/useLayoutEffect#useinsertioneffect
   */
  useLayoutEffect(() => {
    if (showAreaRef.current) {
      const codeElement = showAreaRef.current.querySelector('code')
      if (codeElement && inputAreaRef.current) {
        // 根据textarea scroll来设置 code scroll
        codeElement.scrollTop = inputAreaRef.current?.scrollTop
        codeElement.scrollLeft = inputAreaRef.current?.scrollLeft
      }
    }
  }, [code])

  return (
    <div
      className={styles['container']}
      style={{ minHeight, maxHeight }}
      ref={containerRef}
      onScrollCapture={scrollHandler}
    >
      <div
        className={styles['show-area']}
        dangerouslySetInnerHTML={{ __html: parsed }}
        ref={showAreaRef}
        style={{ minHeight, maxHeight }}
      ></div>
      <textarea
        className={styles['input-area']}
        rows={row}
        value={code}
        onChange={(e) => textChangeHandler(e.target.value)}
        ref={inputAreaRef}
      ></textarea>
    </div>
  )
}
