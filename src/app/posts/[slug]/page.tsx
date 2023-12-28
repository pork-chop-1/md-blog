import { notFound } from 'next/navigation'
import { dealImagePath, getPostBySlug } from '@/lib/api'

import CommentEditor from '@/components/comment-editor'
import PostRender from '@/components/post-render'
import ButtonsSide from '@/components/buttons-side'
import Header from '@/layout/Header'
import Image from 'next/image'
import Footer from '@/layout/Footer'
import DocumentToc from '@/components/document-toc'

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug, [
    'title',
    'content',
    'slug',
    'date',
    'description',
    'img',
    'tags',
  ])
  if (!post) {
    notFound()
  } else {
    const content = post.content as string,
      slug = post.slug as string
    const image = dealImagePath(post.img as string, slug)

    const imageBlock = image ? (
      <figure className="max-w-[800px] max-h-[420px] overflow-hidden object-cover">
        <Image
          src={image}
          alt={''}
          width={800}
          height={420}
        />
      </figure>
    ) : (
      <></>
    )

    return (
      <>
        <Header></Header>
        <div className="flex mx-auto w-full max-w-[1440px] box-border">
          <article className="w-full py-8 px-4">
            {imageBlock}
            <h1 className="my-4 text-3xl font-bold">{params.slug}</h1>
            {/* todo */}
            <p className="h-16 flex items-center">
              <time>2023年5月23日</time>
              <span>5 minute read</span>
            </p>
            <PostRender
              content={content}
              slug={params.slug}
            />
          </article>
          <aside className="w-[240px] sticky max-h-[calc(100vh-2rem)] top-0 pt-8">
            <DocumentToc content={content} />
          </aside>
        </div>
        <ButtonsSide />
        <Footer />
      </>
    )
  }
}
