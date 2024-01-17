import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import { getTagMap } from '@/lib/api'
import Link from 'next/link'

export default function TagsPage() {
  const tagMap = getTagMap()
  return (
    <>
      <Header></Header>

      <div className="min-w-[1200px] mx-auto my-2 min-h-[320px]">
        <p>共有{Object.keys(tagMap).length}个标签</p>
        {Object.keys(tagMap).sort((l, r) => tagMap[r] - tagMap[l]).map((tag) => (
          <Link href={`/tags/${tag}`} className='inline-flex items-center rounded-lg border-2 border-gray-500 p-2 m-4 hover:bg-slate-200 transition-colors cursor-pointer' key={tag}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6Z"
              />
            </svg>
            <span>{tag}</span>
            <span className='inline-block rounded-lg bg-gray-400 text-white px-2 ml-2'>{tagMap[tag]}</span>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  )
}
