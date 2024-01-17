'use client'

import { queryResType } from '@/app/api/query/route'
import ListItem from './list-item'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function List({ list }: { list: queryResType }) {
  const listWithId = list.map((v) => ({
    ...v,
    id: v.innerSlug ? `${v.slug}#${v.innerSlug}` : v.slug,
  }))
  const [activeId, setActiveId] = useState(
    listWithId.length > 0 ? listWithId[0].id : null,
  )

  const router = useRouter()
  
  useEffect(() => {
    const controlHandler = (e: KeyboardEvent) => {
      // console.log(e.key, linksRef.current)
      if(['ArrowUp'].includes(e.key)) {
        e.preventDefault()
        const loc = listWithId.findIndex(v => v.id === activeId)
        if(loc > 0) {
          setActiveId(listWithId[loc - 1].id)
        }
      } else if(['ArrowDown'].includes(e.key)) {
        e.preventDefault()
        const loc = listWithId.findIndex(v => v.id === activeId)
        if(loc !== -1 && loc < listWithId.length - 1) {
          setActiveId(listWithId[loc + 1].id)
        }
      } else if(e.key === 'Enter') {
        e.preventDefault()
        const item = listWithId.find(v => v.id === activeId)
        item && router.push(`/posts/${item.id}`)
      }
    }
    document.addEventListener('keydown', controlHandler)

    return () => document.removeEventListener('keydown', controlHandler)
  }, [activeId])

  return (
    <ul className="px-2 max-h-[320px] overflow-auto">
      {listWithId.map((v) => (
        <li
          key={v.id}
          className={`rounded-lg ${v.id === activeId ? 'bg-gray-200' : ''}`}
          onMouseEnter={() => setActiveId(v.id)}
        >
          <ListItem {...v}/>
        </li>
      ))}
    </ul>
  )
}
