'use client'

import { useState } from 'react'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'

import styles from './index.module.scss'

export default function CommentEditor() {
  const [content, setContent] = useState('')

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeRaw) // 处理md mixin html，尤其script
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
