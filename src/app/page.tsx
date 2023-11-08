import Image from 'next/image'
import styles from './page.module.css'
import { getAllPosts } from '@/lib/api'
import Link from 'next/link'

export default function Home() {
  const allPosts = getAllPosts(['title', 'content', 'slug'])
  return (
    <main>
      <ul>
        {allPosts.map((v) => (
          <li key={v.slug}>
            <Link href={`/posts/${v.slug}`}>
              <h3>{v.title}</h3>
              <p>{(v.content as string).slice(0, 80)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
