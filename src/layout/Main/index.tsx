import Image from 'next/image'
import { getAllPosts } from '@/lib/api'
import Link from 'next/link'
import styles from './index.module.scss'
import PostListItem from './post-list-item'
import SiteInfoBox from './site-info-box'
import AuthorInfoBox from './author-info-box'

export default function Main() {
  const allPosts = getAllPosts({
    fields: ['title', 'content', 'slug', 'date', 'description', 'img', 'tags'],
  })
  console.log(allPosts.map((v) => v.slug))
  return (
    <div className='mb-4'>
      <div className={styles.bg}>
        <img
          src="/default-bg.webp"
          alt=""
        />
      </div>
      <div className='flex mx-auto max-w-6xl'>
        <aside className='w-[240px] mx-8'>
          <SiteInfoBox></SiteInfoBox>
          <AuthorInfoBox></AuthorInfoBox>
        </aside>
        <main className='w-full'>
          <ul className="flex flex-col max-w-5xl">
            {allPosts.map((v) => (
              <li
                key={v.slug}
                className="mb-4"
              >
                <PostListItem
                  title={v.title}
                  description={v.description || v.content.slice(0, 50)}
                  date={v.date}
                  image={v.img}
                  tags={v.tags}
                  link={`/posts/${v.slug}`}
                  slug={v.slug}
                ></PostListItem>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
}
