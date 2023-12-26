// 这是一段unified extension ts代码：
// ```
// import { Node } from 'mdast'
// import { VFile } from 'vfile'
// import { visit } from 'unist-util-visit'
// import {toString} from 'hast-util-to-string'

// function titleLinkExtension() {
//   return (tree: Node, file: VFile) => {
//     visit(tree, 'element', (node: Node) => {
//       if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(node.tagName) !== -1) {
//         const text = toString(node)
//         node.properties.id = text
//         node.children= [{
//           type: 'element',
//           tagName: 'a',
//           properties: {
//             href: '#' + text,
//             ...node.properties
//           },
//           children: node.children
//         }]
//       }
//     })
//   }
// }
// ```
// 它能正常运行但是typescript编译器报错，应该是node的类型不匹配，应该如何修改这段代码？