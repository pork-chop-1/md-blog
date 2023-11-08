'use client'

export default function StyleTag({content}: {content: string}) {
  // window.addEventListener('load', () => {
  // })
  const inside = `
    ${content}
  `
  return <style dangerouslySetInnerHTML={{__html: inside}}>
  </style>
}