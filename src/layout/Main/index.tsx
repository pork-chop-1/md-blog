import Image from 'next/image'
import { getAllPosts } from '@/lib/api'
import Link from 'next/link'
import styles from './index.module.scss'

export default function Main() {
  const allPosts = getAllPosts({fields: ['title', 'content', 'slug', 'date']})
  return (
    <div>
      <div className={styles.bg}>
        <img
          src="/default-bg.webp"
          alt=""
        />
      </div>
      <div className='flex'>
        <aside>

        </aside>
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
      </div>
    </div>
  )
}
