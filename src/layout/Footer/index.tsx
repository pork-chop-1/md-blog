import { CanvasNest } from '@/components/canvas-nest'

export default function Footer() {
  return <footer className="bg-[#f9f9fb] [&>p]:text-center h-[300px] relative">
    <CanvasNest />
    <div className='w-full h-full flex justify-center items-center flex-col absolute top-0 bg-transparent'>
      <p>© 2023 Tom</p>
      <p>POWERED BY <img src="/next.svg" alt="" className="w-16 h-6 inline align-bottom"/></p>
    </div>
  </footer>
}