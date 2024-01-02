import Link from 'next/link'
import Image from 'next/image'
import { dealImagePath } from '@/lib/api'

export default function PostListItem({
  title,
  description,
  date,
  tags,
  image,
  link,
  slug,
}: {
  title: string
  description: string
  date: Date
  tags: string[]
  image?: string
  link: string
  slug: string
}) {
  let imageContainer = <></>
  if (image) {
    let [path, isRelative] = dealImagePath(image, slug)
    let imgTag = (
      <Image
        src={path}
        alt={title}
        width={960}
        height={320}
      />
    )
    if (isRelative) {
      imgTag = (
        <img
          src={path}
          alt={title}
          width={960}
          height={320}
        ></img>
      )
    }
    imageContainer = (
      // https://github.com/vercel/next.js/discussions/17346#discussioncomment-84699
      // 有关script dangerous html 在点击Link加载不正确
      <a
        className="w-full max-h-[220px] overflow-hidden object-cover block"
        href={link}
      >
        {imgTag}
      </a>
    )
  }
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden bg-white/80">
      {imageContainer}
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          <a href={link}>{title}</a>
        </h2>
        <p>{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span>{date.toLocaleDateString()}</span>
            <ul className="flex">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <div>
            <Link href={link}>read more</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
