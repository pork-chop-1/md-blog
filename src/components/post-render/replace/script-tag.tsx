'use client'

export default function ScriptTag({content}: {content: string}) {
  // window.addEventListener('load', () => {
  // })
  const inside = `
    ${(content)}
  `
  return <script dangerouslySetInnerHTML={{__html: inside}}>
  </script>
}