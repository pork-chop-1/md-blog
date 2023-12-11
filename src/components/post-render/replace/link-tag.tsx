import { LinkHTMLAttributes } from 'react'

export default function LinkTag(
  props: {
    slug: string
  } & LinkHTMLAttributes<HTMLLinkElement>,
) {
  let href = props.href
  // ./ 开头的表示引用文档相对路径
  if (props.href && /^\.\//.test(props.href)) {
    href = `/assets/${props.slug}/${props.href.substring(2)}`
  }

  return <link {...props} href={href}></link>
}
