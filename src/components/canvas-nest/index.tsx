'use client'

import { useEffect } from "react";

const CanvasNestJS = require('canvas-nest.js') 

const config = {
  color: '0,0,0',
  count: 88,
};

// Using config rendering effect at 'element'.

export function CanvasNest() {
  useEffect(() => {
    if(typeof window !== 'undefined') {
      // post-wrapper
      const cn = new CanvasNestJS(document.querySelector('#post-wrapper'), config);
  
      return () => cn.destroy()
    }
  }, [])
  return <></>
}