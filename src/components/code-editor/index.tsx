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
import { useCopyToClipBoard } from '@/lib/hooks'

export default function CodeEditor({
  language,
  children,
  minHeight,
  maxHeight,
  title,
}: {
  language: string
  children?: string
  minHeight?: number
  maxHeight?: number
  title?: string
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
      inputAreaRef.current.style.left = `${left}px`
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

  // top button
  const resetHandler = () => {
    textChangeHandler(children || '')
  }

  const [_copiedText, copyIt] = useCopyToClipBoard()
  const copyHandler = () => {
    copyIt(code)
  }

  return (
    <div className="rounded-lg bg-black text-white overflow-hidden">
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <div>
          <button onClick={resetHandler} className="border rounded-sm mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>
          <button onClick={copyHandler} className="border rounded-sm mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </button>
        </div>
      </div>
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
    </div>
  )
}
