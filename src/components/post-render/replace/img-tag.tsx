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
  }

  return (
    <Image
      style={style}
      alt={alt || ''}
      src={src}
      width={200}
      height={200}
      // lazyBoundary=''
      // loading='lazy'
      // priority={true}
    ></Image>
  )
}
