import Link from 'next/link'
import Image from 'next/image'

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
    if (/^\.\//.test(image)) {
      image = `/assets/${slug}/${image.substring(2)}`
    }
    imageContainer = (
      <Link
        className="w-full max-h-[220px] overflow-hidden object-cover block"
        href={link}
      >
        <Image
          src={image}
          alt="some"
          width={960}
          height={320}
        />
      </Link>
    )
  }
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden bg-white/80">
      {imageContainer}
      <div className='p-8'>
        <h2 className="text-2xl font-bold">
          <Link href={link}>{title}</Link>
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
