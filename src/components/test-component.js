'use client'
import { useState } from 'react'

export default function TestComponent() {
  const [num, setNum] = useState(0)
  return (
    <>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>click</button>
      {/* <script dangerouslySetInnerHTML={{__html:'alert("hello")'}}>
    </script> */}
    </>
  )
}
