---
title: test1
date: 2023-01-01 00:00:00
tags: css test javascript
img: https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000&t=st=1703060873~exp=1703061473~hmac=2be0dfb9255bd51260ef91dc646a87f3c24d2f1eda493892d3e1e4660bdd9382
---

# Hello world!

> title image from: [](https://www.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_40965130.htm#query=wallpaper&position=4&from_view=keyword&track=sph&uuid=9e7d62c9-9960-4dff-b5f1-784dd425b086)

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
