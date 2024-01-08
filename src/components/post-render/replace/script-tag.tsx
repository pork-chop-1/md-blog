'use client'

import { ScriptHTMLAttributes } from "react"
import Script from "next/script"

export default function ScriptTag(props: {
  children?: string,
  slug?: string
} & ScriptHTMLAttributes<HTMLScriptElement>) {
  let src = props.src
  // ./ 开头的表示引用文档相对路径
  if (src && /^\.\//.test(src)) {
    if(props.slug == null) {
      return <></>
    }
    src = `/assets/${props.slug}/${src.substring(2)}`
  }
  if(!src && !props.children) {
    return <></>
  }
  if(typeof document !== 'undefined') {
    const script = document.createElement("script");
    
		src && (script.src = src);
    props.children && (script.text = props.children)

    delete props.children
    delete props.slug
    delete props.src
    Object.keys(props).forEach(v => {
      script.setAttribute(v, props[v as keyof ScriptHTMLAttributes<HTMLScriptElement>])
    })

		document.body.appendChild(script);
  }

  return <></>
  // delete props.children
  // delete props.slug
  // return <script {...props} src={src} dangerouslySetInnerHTML={{__html: inside}}></script>
}
