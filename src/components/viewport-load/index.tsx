'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * ref: https://github.com/xiaojundebug/xiaojun.im/blob/main/src/components/LazyLoad.tsx
 */
export default function ViewportLoad({
  children,
}: {
  children: React.ReactNode
}) {
  const container = useRef<HTMLDivElement>(null)

  const [isLoad, setIsLoad] = useState(false)


  useEffect(() => {
    if(container.current) {
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            console.log('done')
            if (entry.isIntersecting) {
              setIsLoad(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '0px 0px 0px 0px',
        },
      ).observe(container.current)
    }
  }, [container])

  return <div className='w-full min-h-[240px]' ref={container}>{isLoad ? children : <></>}</div>
}
