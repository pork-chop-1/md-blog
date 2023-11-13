'use client'

export default function StyleTag({
  children,
}: {
  children?: string
}) {
  // window.addEventListener('load', () => {
  // })
  const inside = `
    ${children || ''}
  `
  return <style dangerouslySetInnerHTML={{__html: inside}}>
  </style>
}
