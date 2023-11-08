import * as prod from 'react/jsx-runtime'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import rehypeReact from 'rehype-react'

import ScriptTag from './replace/script-tag'
import StyleTag from './replace/style-tag'
import Link from 'next/link'
import Image from 'next/image'
import ImageTag from './replace/img-tag'

export default function TmpCreated({ content }: { content: string }) {
  // https://unifiedjs.com/explore/package/rehype-react/#use
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeRaw) // 处理md mixin html，尤其script
    .use(rehypeStringify, {allowDangerousHtml: true})
    .use(rehypeReact, {
      // @ts-expect-error: the react types are missing.
      Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs,
      components: {
        script: (props) => <ScriptTag content={props.children as string} />,
        style: (props) => <StyleTag content={props.children as string} />,
        a: (props) => <Link href={props.href || ''}>{props.children}</Link>,
        img: (props) => <ImageTag {...props}></ImageTag>
      }
    })
  const ContentProcessed = processor.processSync(content).result
  return ContentProcessed
}