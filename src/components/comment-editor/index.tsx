'use client'

import { useState } from 'react'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

import styles from './index.module.scss'

export default function CommentEditor() {
  const [content, setContent] = useState('')

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeRaw) // 处理md mixin html，尤其script
    .use(rehypeSanitize)
    .use(rehypeStringify)

  return (
    <div className={styles['comment-editor-container']}>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        onChange={(v) => setContent(v.target.value)}
        value={content}
      ></textarea>
      <div className="">{processor.processSync(content).value.toString()}</div>
    </div>
  )
}
