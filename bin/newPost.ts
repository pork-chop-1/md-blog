import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'path'

const name = process.argv[2]

const date = new Date().toLocaleDateString()
console.log(date, name)

const content = `---
title: ${name}
date: ${new Date().toLocaleString('zh-CN')}
tags: 
img: /default-bg.webp
---

`

mkdirSync(join(__dirname, '../_posts', date, name), { recursive: true })
writeFileSync(join(__dirname, '../_posts', date, name, 'index.md'), content)