'use client'

import { useEffect, useState } from 'react'
import DocSearchModal from '../doc-search-modal'
import ReactDOM from 'react-dom'

export default function SearchInput() {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    const keyBindHandler = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault()
        showModal()
      }
      if(e.key === 'Escape') {
        setIsShowing(false)
      }
    }
    document.addEventListener('keydown', keyBindHandler)

    return () => document.removeEventListener('keydown', keyBindHandler)
  }, [])

  function showModal() {
    setIsShowing(true)
  }

  return (
    <button
      className="flex bg-gray-100 border-2 border-gray-100 p-2 rounded-lg text-sm items-center transition-colors hover:border-gray-500"
      onClick={showModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      Search
      <span className="rounded border border-gray-300 ml-2">Ctrl K</span>
      {<DocSearchModal showing={isShowing} setShowing={setIsShowing}/>}
    </button>
  )
}
