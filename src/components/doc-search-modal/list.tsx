import { queryResType } from '@/app/api/query/route'
import ListItem from './list-item'
import { useEffect, useRef, useState } from 'react'

export default function List({ list }: { list: queryResType }) {
  const listWithId = list.map((v) => ({
    ...v,
    id: v.innerSlug ? `${v.slug}#${v.innerSlug}` : v.slug,
  }))
  const [activeId, setActiveId] = useState(
    listWithId.length > 0 ? listWithId[0].id : null,
  )

  
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
        activeId && linksRef.current[activeId].click()
      }
    }
    document.addEventListener('keydown', controlHandler)

    return () => document.removeEventListener('keydown', controlHandler)
  }, [activeId])

  const linksRef = useRef<{[key: string]: any}>({})

  return (
    <ul className="px-2">
      {listWithId.map((v) => (
        <li
          key={v.id}
          className={`rounded-lg ${v.id === activeId ? 'bg-gray-200' : ''}`}
          onMouseEnter={() => setActiveId(v.id)}
        >
          <ListItem {...v} ref={item => linksRef.current[v.id] = item}/>
        </li>
      ))}
    </ul>
  )
}
