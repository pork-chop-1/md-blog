import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function DocSearchModal({
  setShowing,
  showing,
}: {
  setShowing?: (show: boolean) => void
  showing?: boolean
}) {

  function backgroundClick(e: React.MouseEvent<HTMLDivElement>) {
    if(e.target === e.currentTarget) {
      setShowing && setShowing(false)
    }
  }

  // https://stackoverflow.com/questions/76268977/how-to-create-a-portal-modal-in-next-13-4
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const [search, setSearch] = useState('')

  return showing && mounted
    ? createPortal(
        <div
          className="doc-search-modal-container fixed w-full h-full z-50 bg-gray-300/30 inset-0 "
          onClickCapture={backgroundClick}
        >
          <div className='rounded-lg bg-white shadow m-auto mt-16 border w-[640px] min-h-[400px] overflow-hidden'>
            <div className='border-b relative '>
              <input type="text" className='w-full leading-10 text-lg p-3 outline-none' placeholder='Search Article' value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            <div>
              <ul></ul>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null
}
