---
title: test1
date: 2023-01-01 00:00:00
tags: css test javascript
---

# Hello world!

www.example.com, https://example.com, and contact@example.com.

```jsx
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
    // const fullPath = join(process.cwd(), '_posts', `${slug}.mdx`)
    const code = await compile(content, { outputFormat: 'function-body' })
    const yields = await run(code, { ...runtime })

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
}
```

<TestComponent />

<script>
  console.log(window)
</script>

<div className='test'> test</div>

<style>
.test {
  width: 200px;
  height: 200px;
  background: skyblue;
}
</style>

[Link text Here](https://link-url-here.org)

https://mdxjs.com/packages/remark-mdx/#syntax-tree
https://unifiedjs.com/learn/guide/create-a-plugin/

![drawing](/next.svg)

<img src="/chicken.webp" alt="drawing1" style="width:300px;"/>
