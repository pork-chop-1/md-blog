import dbConnect from "@/lib/mongodb"
import Likes from "@/model/likes"
import { NextRequest } from "next/server"

type GetParams = {
  params: {
    slug: string[]
  }
}

export async function GET(request: Request, { params }: GetParams) {
  let slug = params.slug.join('\/')
  const res = await Likes.find().where('slug').equals(slug)

  return Response.json(res.length > 0 ? res[0].count : 0)
}

type PatchParams = {
  params: {
    slug: string[]
  }
}

export async function PATCH(request: NextRequest, { params }: PatchParams) {

  const inc = Number(request.nextUrl.searchParams.get('inc'))
  let slug = params.slug.join('\/')
  if(Number.isNaN(inc)) {
    throw 'inc not valid'
  }
  if(inc > 50) {
    throw 'oops!!!'
  }
  
  const res = await Likes.updateOne({slug}, {$inc: {count: inc}}, {upsert: true})

  return Response.json({})
}