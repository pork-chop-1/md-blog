import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import { getPostsByTag } from '@/lib/api'
import Link from 'next/link'

export default function TagSlug({ params }: { params: { slug: string } }) {
  const list = getPostsByTag(params.slug)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 min-w-[1200px]">
        <h2 className='flex items-center text-3xl leading-8'>
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
          {params.slug}
        </h2>
        {list.map((item) => {
          return (
            <Link
              href={`/posts/${item.slug}`}
              key={item.slug}
              className='rounded-lg bg-gray-50 '
            >
              <div>{item.title}</div>
              <div>{new Date(item.date).toLocaleDateString()}</div>
            </Link>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}
