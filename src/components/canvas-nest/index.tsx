'use client'

import { useEffect } from "react";



const config = {
  color: '0,0,0',
  count: 18,
};

// Using config rendering effect at 'element'.

export function CanvasNest() {
  useEffect(() => {
    if(typeof window !== 'undefined') {
      // post-wrapper
      const CanvasNestJS = require('canvas-nest.js') 
      const cn = new CanvasNestJS(document.querySelector('#nest-wrapper'), config);
  
      return () => cn.destroy()
    }
  }, [])
  return <div id={'nest-wrapper'} className="h-32 w-full bg-transparent z-10"></div>
}