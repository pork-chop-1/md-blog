import Image from 'next/image'
import { ClassAttributes, ImgHTMLAttributes } from 'react';

export default function ImageTag({src, alt, style}: ImgHTMLAttributes<HTMLImageElement> & ClassAttributes<HTMLImageElement>) {
  if(!src) {
    // type a = ImgHTMLAttributes<HTMLImageElement> & ClassAttributes<HTMLImageElement>
    // type b = a['onTransitionEndCapture']
    return <></>
  }
  return (
    <Image
      style={style}
      alt={alt || ''}
      src={src}
      width={200}
      height={200}
    ></Image>
  )
}
