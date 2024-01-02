'use client'

import { ScriptHTMLAttributes } from "react"
import Script from "next/script"

export default function ScriptTag(props: {
  children?: string,
  slug?: string
} & ScriptHTMLAttributes<HTMLScriptElement>) {
  // window.addEventListener('load', () => {
  // })
  const inside = `
    ${props.children || ''}
  `

  
  let src = props.src
  // ./ 开头的表示引用文档相对路径
  if (src && /^\.\//.test(src)) {
    src = `/assets/${props.slug}/${src.substring(2)}`
  }

  delete props.children
  delete props.slug
  return <script {...props} src={src} dangerouslySetInnerHTML={{__html: inside}}></script>
}
