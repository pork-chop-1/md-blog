import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/api'

import CommentEditor from '@/components/comment-editor'
import PostRender from '@/components/post-render'

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug, ['title', 'content'])
  if (!post) {
    notFound()
  } else {
    const content = post.content as string
    // const processor = unified()
    //   .use(remarkParse)
    //   .use(rehypeReact, production)
    // .use(remarkRehype, {allowDangerousHtml: true})
    // .use(rehypeRaw) // 处理md mixin html，尤其script
    // .use(rehypeSlug) // 为html h1添加id
    // .use(rehypeAutolinkHeadings) // 为添加完id的标题添加link icon
    // .use(rehypeStringify)

    // const contentProcessed = processor.processSync(content).result

    return (
      <>
        <h1>{params.slug}</h1>
        {/* <div dangerouslySetInnerHTML={{ __html: contentProcessed.toString() }}> */}
        {/* </div> */}
        <PostRender content={content} />
        <br />
        <CommentEditor />
      </>
    )
  }
}
