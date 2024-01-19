'use client'

import { queryResType } from '@/app/api/query/route'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import _ from 'lodash-es'
import List from './list'

export default function DocSearchModal({
  setShowing,
  showing,
}: {
  setShowing?: (show: boolean) => void
  showing?: boolean
}) {
  function backgroundClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setShowing && setShowing(false)
    }
  }

  // https://stackoverflow.com/questions/76268977/how-to-create-a-portal-modal-in-next-13-4
  const [mounted, setMounted] = useState(false)
  const [list, setList] = useState<queryResType>([])
  const initList = useRef<queryResType>([])
  useEffect(() => {
    setMounted(true)
  }, [])

  const [search, setSearch] = useState('')

  const fetchQuery = (keyword: string) => {
    fetch('/api/query?keyword=' + keyword, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        setList(res)
      })
  }

  const searchHandler = useCallback(
    _.throttle((value: string) => {
      if (value === '') {
        setList(initList.current)
      } else {
        fetchQuery(value)
      }
    }, 500),
    [],
  )
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    searchHandler(e.target.value)
  }

  useEffect(() => {
    fetch('/api/query', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        initList.current = res
        setList(initList.current)
      })
  }, [])

  return showing && mounted ? (
    <>
      {createPortal(
        <div
          className="doc-search-modal-container fixed w-full h-full z-50 bg-gray-300/30 inset-0 "
          onClickCapture={backgroundClick}
        >
          <div className="rounded-lg bg-white shadow m-auto mt-16 border w-[640px] min-h-[400px] overflow-hidden">
            <div className="border-b relative ">
              <input
                type="text"
                className="w-full leading-10 text-lg p-3 outline-none"
                placeholder="Search Article"
                value={search}
                onChange={changeHandler}
                autoFocus
              />
            </div>
            <div>
              <List list={list} />
            </div>
          </div>
        </div>,
        document.body,
      )}
      {createPortal(
        <style>
          {`body {
            overflow: hidden
          }`}
        </style>,
        document.head,
      )}
    </>
  ) : null
}
