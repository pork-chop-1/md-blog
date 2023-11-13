'use client'

export default function EscapeTag({ children }: { children?: string }) {

  if (!children) {
    return <></>
  }
  let content = ''
  content = children

  return <div dangerouslySetInnerHTML={{__html: content}}></div>
}
