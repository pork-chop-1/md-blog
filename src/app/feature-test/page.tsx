'use client'

import Editor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { useState } from 'react'

import { Button, useButton } from '@mui/base'

export default function FeatureTest() {
  const [content, setContent] = useState(`
  import { getPostBySlug } from '@/lib/api'
  import { notFound } from 'next/navigation'
  import { compile, evaluate, run } from '@mdx-js/mdx'
  import { join } from 'path'
  import fs from 'fs'
  import * as runtime from 'react/jsx-runtime'
  import remarkFrontmatter from 'remark-frontmatter'
  
  export default async function PostDetailPage({ params: { slug } }) {
    try {
      // console.log(slug)
      const { title, date, content } = getPostBySlug(slug, [
        'title',
        'slug',
        'date',
        'content',
      ])
      // const fullPath = join(process.cwd(), '_posts', )
      const code = await compile(content, { outputFormat: 'function-body' })
      const yields = await run(code, { ...runtime })
  
      console.log(date)
      return (
        <>
          <h1>{title}</h1>
          <p>{date.toLocaleString('zh-CN', {})}</p>
          <yields.default></yields.default>
        </>
      )
    } catch (e) {
      console.warn(e)
      notFound()
    }
  }`)

  const { getRootProps } = useButton()

  const editorContentHandler = (
    content: string | undefined,
    env: editor.IModelContentChangedEvent,
  ) => {
    content && setContent(content)
  }

  return (
    <>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={content}
        onChange={editorContentHandler}
      />

      <Button>button click</Button>
      <button
        type="button"
        {...getRootProps()}
      >
        Click Me
      </button>
    </>
  )
}

// https://www.npmjs.com/package/react-live
// https://github.com/react-simple-code-editor/react-simple-code-editor/blob/main/example/App.tsx
