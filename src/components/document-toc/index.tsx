'use client'

import remarkParse from 'remark-parse'
import { unified } from 'unified'
import GithubSlugger, { slug } from 'github-slugger'
import { toString } from 'hast-util-to-string'

import TocItem from './toc-item'

const slugs = new GithubSlugger()

export default function DocumentToc({ content }: { content: string }) {
  slugs.reset()
  const res = unified().use(remarkParse).parse(content)

  const json = res.children
    .filter((v) => v.type === 'heading')
    .map((v) => {
      return {
        // @ts-expect-error type not match
        title: slugs.slug(toString(v)),
        // @ts-expect-error heading ast node contains depth
        level: v.depth,
        
      }
    })

  function handler() {}

  return (
    <div className="document-toc-container">
      <ul>
        {json.map((v) => (
          <li key={v.title}>
            <TocItem
              href={`#${process.env.NEXT_PUBLIC_ID_PREFIX}-${v.title}`}
              level={v.level}
              onClick={handler}
            >
              {v.title}
            </TocItem>
          </li>
        ))}
      </ul>
    </div>
  )
}
