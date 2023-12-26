import { getHeaderExtension } from "@/lib/unified/header"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { unified } from "unified"


export default function DocumentToc({ content }: { content: string }) {
  const res = unified()
    .use(remarkParse)
    .use(getHeaderExtension)
    .parse(content)
  // console.log(JSON.stringify(res, null, " "));


  return <div className="document-toc-container"></div>
}
