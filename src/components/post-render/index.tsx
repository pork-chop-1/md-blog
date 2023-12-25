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

import { Node } from 'mdast'
import {VFile} from 'vfile'
import {visit} from 'unist-util-visit'
import {ContainerDirective} from 'mdast-util-directive'
import {h} from 'hastscript'
import EscapeTag from './replace/escape-tag'
import LinkTag from './replace/link-tag'

import './index.scss'

export default function PostRender({ content, slug }: { content: string, slug: string }) {
  // https://unifiedjs.com/explore/package/rehype-react/#use
  const processor = unified()
    .use(remarkParse)
    .use(remarkDirective) // ::命令
    .use(myRemarkPlugin)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeRaw) // 处理md mixin html，尤其script
    .use(rehypeStringify, {allowDangerousHtml: true})
    // .use(addSomeExtension)
    // @ts-expect-error escape is defined by me
    .use(rehypeReact, {
      // @ts-expect-error: the react types are missing.
      Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs,
      components: {
        script: (props) => <ScriptTag {...props} slug={slug}>{props.children as string}</ScriptTag>,
        style: (props) => <StyleTag >{props.children as string}</StyleTag>,
        a: (props) => <Link href={props.href || ''}>{props.children}</Link>,
        img: (props) => <ImageTag {...props} slug={slug}></ImageTag>,
        escape: EscapeTag,
        link: (props) => <LinkTag {...props} slug={slug}/>
      },
      passKeys: true
    })
  const ContentProcessed = processor.processSync(content).result

  // console.log(ContentProcessed)
  return <div id="article-rendered">{ContentProcessed}</div>
}


function addSomeExtension() {
  return (tree: Node, file: VFile) => {
    visit(tree, 'element', (node: Node, idx, parent) => {
      // console.log(node)
      // if(node.tagName)
    })
    // console.log(tree, file)
  }
}

function myRemarkPlugin() {
  return (tree: Node, file: VFile) => {
    visit(tree, 'containerDirective', (node: ContainerDirective, idx, parent) => {
      // console.log(node)
      // clear content
      if(node.name==='escape') {
        // node.children = []

        const data = node.data || (node.data = {})
        const tagName = 'escape'
  
        data.hName = tagName
        // data.hProperties = h(tagName, { class: `` }).properties

        // console.log(node)
        let textContent = ''
        node.children.forEach(v => {
          if(v.type==='html'){
            textContent += v.value
          }
        })
        // [{
        //   type: 'paragraph',
        //   children: [{
        //     type: 'text',
        //     value: `${textContent}`
        //   }]
        // }]
        node.children = [{
          // @ts-expect-error no text type but works
          type: 'text',
          value: `${textContent}`
        }]
      }
    })
  }
}