import Image from 'next/image'
import { ClassAttributes, ImgHTMLAttributes } from 'react'

export type ImageTagParam = ImgHTMLAttributes<HTMLImageElement> &
  ClassAttributes<HTMLImageElement> & {
    slug: string
  }

export default function ImageTag({ src, alt, style, slug }: ImageTagParam) {
  if (!src) {
    // type a = ImgHTMLAttributes<HTMLImageElement> & ClassAttributes<HTMLImageElement>
    // type b = a['onTransitionEndCapture']
    return <></>
  }

  // ./ 开头的表示引用文档相对路径
  if (/^\.\//.test(src)) {
    src = `/assets/${slug}/${src.substring(2)}`
    return <img 
    style={style}
    alt={alt || ''}
    src={src}>
    </img>
  } else if(/^\//.test(src)) {
    <Image
      style={style}
      alt={alt || ''}
      src={src}
      width={Number(style?.width) || 800}
      height={Number(style?.height) || 420}
      // lazyBoundary=''
      // loading='lazy'
      // priority={true}
    ></Image>
  }

  return (
    <img
      style={style}
      alt={alt || ''}
      src={src}
    ></img>
  )
}
