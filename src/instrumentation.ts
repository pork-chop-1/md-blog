// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

import dbConnect from '@/lib/mongodb'
import fs from 'fs'
import { join } from 'path'
export async function register() {
  dbConnect().then(() => {
    console.log('mongodb connected!')
  })
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initPostData } = await import('./lib/api')
    initPostData()
  }
}
