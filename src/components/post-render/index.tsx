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
import remarkDirective from 'remark-directive'

import ScriptTag from './replace/script-tag'
import StyleTag from './replace/style-tag'
import Link from 'next/link'
import Image from 'next/image'
import ImageTag from './replace/img-tag'
import LinkTag from './replace/link-tag'
import EscapeTag from './replace/escape-tag'

import './index.scss'
import { headerLinkExtension } from '@/lib/unified/header'
import { escapeRemarkPlugin } from '@/lib/unified/escape'

import CodeEditor from '@/components/code-editor';
import CodePen from './custom/CodePen'
import Doodle from '../doodle'
import HeightLightCode from './custom/hight-light-code'
import { ReactElement } from 'react'
import dynamic from 'next/dynamic'

// 添加自定义的玩意
const customizeTags = {
  escape: dynamic(() => import('./replace/escape-tag'), {ssr: false}),
  codeeditor: dynamic(() => import('@/components/code-editor'), {ssr: false}),
  codepen: dynamic(() => import('./custom/CodePen'), {ssr: false}),
  cssdoodle: dynamic(() => import('../doodle'), {ssr: false}),
}

export default function PostRender({
  content,
  slug,
}: {
  content: string
  slug: string
}) {
  // https://unifiedjs.com/explore/package/rehype-react/#use
  const processor = unified()
    .use(remarkParse)
    .use(remarkDirective) // ::命令
    .use(escapeRemarkPlugin)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    // .use(rehypeHighlight)
    .use(rehypeRaw) // 处理md mixin html，尤其script
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(headerLinkExtension)
    .use(rehypeReact, {
      // @ts-expect-error: the react types are missing.
      Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs,
      components: {
        script: (props) => (
          <ScriptTag
            {...props}
            slug={slug}
          >
            {props.children as string}
          </ScriptTag>
        ),
        style: (props) => <StyleTag>{props.children as string}</StyleTag>,
        a: (props) => <Link href={props.href || ''}>{props.children || props.href}</Link>,
        img: (props) => (
          <ImageTag
            {...props}
            slug={slug}
          ></ImageTag>
        ),
        // p: (props) => <div>{props.children as string}</div>,
        link: (props) => (
          <LinkTag
            {...props}
            slug={slug}
          />
        ),
        pre: (props) => (<HeightLightCode>{props.children as ReactElement<HTMLElement>}</HeightLightCode>),
        ...customizeTags
      },
      passKeys: true,
    })
  const ContentProcessed = processor.processSync(content).result

  // console.log(ContentProcessed)
  return <div id="article-rendered">{ContentProcessed}</div>
}
