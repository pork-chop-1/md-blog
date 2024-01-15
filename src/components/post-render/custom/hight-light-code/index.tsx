'use client'

import { ReactElement, useMemo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { loadLanguage, LanguageName } from '@uiw/codemirror-extensions-langs'
import { useCopyToClipBoard } from '@/lib/hooks'
import { githubLightInit } from '@uiw/codemirror-theme-github'
import styles from './index.module.scss'
import { clearSideBreaks } from '@/lib/clientTools'

export default function HeightLightCode({
  children,
}: {
  children: ReactElement<HTMLElement>
}) {
  const content: string = useMemo(
    () => clearSideBreaks(children.props.children.toString()),
    [children],
  )
  const className = children.props.className

  const extension = className?.split('-').at(-1) || ''

  const loaded = loadLanguage(extension as LanguageName)

  const [state, copyMemo] = useCopyToClipBoard()

  const [copied, setCopied] = useState(false)
  const CopyHandler = () => {
    if (copied) return
    copyMemo(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const theme = githubLightInit({})

  return (
    <div
      className={`rounded overflow-hidden bg-gray-100 border ${styles.wrapper}`}
    >
      <div className="flex justify-between items-center px-4">
        <span>{extension.toUpperCase()}</span>
        <button
          onClick={CopyHandler}
          className="flex items-center"
        >
          {copied ? (
            <>
              <span className="text-sm">Copied</span>
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
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
            </>
          ) : (
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          )}
        </button>
      </div>
      <CodeMirror
        value={content}
        extensions={loaded ? [loaded] : []}
        theme={theme}
        basicSetup={{
          highlightActiveLineGutter: false,
          highlightActiveLine: false,
        }}
        readOnly
      />
    </div>
  )
}
