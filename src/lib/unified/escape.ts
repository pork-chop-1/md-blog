
import { Node } from 'mdast'
import { VFile } from 'vfile'
import { visit } from 'unist-util-visit'
import { ContainerDirective } from 'mdast-util-directive'
import { h } from 'hastscript'

export function escapeRemarkPlugin() {
  return (tree: Node, file: VFile) => {
    visit(
      tree,
      'containerDirective',
      (node: ContainerDirective, idx, parent) => {
        // clear content
        if (node.name === 'escape') {
          // node.children = []

          const data = node.data || (node.data = {})
          const tagName = 'escape'

          data.hName = tagName
          // data.hProperties = h(tagName, { class: `` }).properties

          // console.log(node)
          let textContent = ''
          node.children.forEach((v) => {
            if (v.type === 'html') {
              textContent += v.value
            }
          })
          node.children = [
            {
              // @ts-expect-error no text type but works
              type: 'text',
              value: `${textContent}`,
            },
          ]
        }
      },
    )
  }
}
