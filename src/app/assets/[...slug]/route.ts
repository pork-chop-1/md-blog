import { NextRequest, NextResponse } from "next/server";

import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { fileTypeFromBuffer } from 'file-type';
import { notFound } from "next/navigation";

type GetParams = {
  params: {
    slug: string[]
  }
}

export async function GET(request: Request, { params }: GetParams) {
  const filePath = join(process.cwd(), '_posts', ...params.slug)
  if(!existsSync(filePath)) {
    notFound()
  }
  const fileBuffer = readFileSync(filePath)


  let type = await fileTypeFromBuffer(fileBuffer)
  
  let mime: string | undefined = type?.mime
  if(mime == undefined) {
    const path = new URL(request.url).pathname
    if(/.js$/.test(path)) {
      mime = 'text/javascript'
    } else if(/.css/.test(path)) {
      mime = 'text/css'
    }
  }
  return new Response(fileBuffer, {
    headers: {
      'Content-type': mime ? mime : 'text/plain'
    }
  })
}