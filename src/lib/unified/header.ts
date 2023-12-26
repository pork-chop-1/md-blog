
import {toString} from 'hast-util-to-string'
import GithubSlugger from 'github-slugger'
import { visit, SKIP } from 'unist-util-visit'
import { Node } from 'mdast'
import { VFile } from 'vfile'

export type HtmlNode = Node & {
  properties: {[key: string]: any},
  tagName: string,
  children: HtmlNode[]
}

const slugs = new GithubSlugger()
export function headerLinkExtension() {
  return (tree: Node, file: VFile) => {
    slugs.reset()

    visit(tree, 'element', (node: HtmlNode) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(node.tagName) !== -1) {
        // @ts-ignore
        const text = slugs.slug(toString(node))
        node.properties.id = text
        node.children= [{
          type: 'element',
          tagName: 'a',
          properties: {
            href: '#' + text,
            ...node.properties
          },
          children: node.children
        }]
      }
    })
    // console.log(tree, file)
  }
}


export function getHeaderExtension() {
  return (tree: Node, file: VFile) => {
    console.log(tree)
    visit(tree, 'element', (node: HtmlNode) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(node.tagName) !== -1) {
        console.log(node)
      }else {
        return SKIP
      }
    })
  }
}