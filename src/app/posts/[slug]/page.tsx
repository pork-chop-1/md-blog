import { notFound } from 'next/navigation'
import { dealImagePath, getPostBySlug } from '@/lib/api'

import PostRender from '@/components/post-render'
import ButtonsSide from '@/components/buttons-side'
import Header from '@/layout/Header'
import Image from 'next/image'
import Footer from '@/layout/Footer'
import DocumentToc from '@/components/document-toc'
import { CanvasNest } from '@/components/canvas-nest'

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
      slug = post.slug as string,
      title = post.title as string
    const [path, isRelative] = dealImagePath(post.img as string, slug)

    const imageBlock = path ? (
      <figure className="max-w-[800px] max-h-[420px] overflow-hidden object-cover">
        {isRelative ? (
          <img
            src={path}
            alt={title}
            width={800}
            height={420}
          />
        ) : (
          <Image
            src={path}
            alt={title}
            width={800}
            height={420}
          />
        )}
      </figure>
    ) : (
      <></>
    )

    return (
      <>
        <Header></Header>
        <main className="flex mx-auto w-full max-w-[1440px] box-border" id="post-wrapper">
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
        </main>
        {/* <ButtonsSide /> */}
        <Footer />
        {/* <CanvasNest /> */}
      </>
    )
  }
}
