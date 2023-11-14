import Image from 'next/image'
import styles from './page.module.css'
import { getAllPosts } from '@/lib/api'
import Link from 'next/link'
import CodeEditor from '@/components/code-editor'


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

      <Link href={'/feature-test'}>feature test</Link>

      <CodeEditor language="js" maxHeight={200}>
      {`http://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/te
st_pagehattp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/te
st_pagehattp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/te
st_pagehattp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/te
st_pagehattp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/te
st_pagehattp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/te
st_pagehattp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/test_pagehttp://localhost:3000/posts/te
st_pagehattp://localhost:3000/posts/test_page`}
      </CodeEditor>

    </main>
  )
}
