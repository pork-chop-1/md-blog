'use client'

import { ScriptHTMLAttributes } from "react"

export default function ScriptTag(props: {
  children?: string
} & ScriptHTMLAttributes<HTMLScriptElement>) {
  // window.addEventListener('load', () => {
  // })
  const inside = `
    ${props.children || ''}
  `

  delete props.children
  return <script {...props} dangerouslySetInnerHTML={{__html: inside}}></script>
}
