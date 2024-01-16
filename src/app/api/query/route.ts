import { allSearchData, initPostData } from "@/lib/api";
import { NextRequest } from "next/server";

export type queryResType = { slug: string, title: string, innerTitle?: string, innerSlug?: string }[]

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get('keyword') || ''
  if (!allSearchData) {
    initPostData()
  }
  
  if (keyword.length === 0) {
    return Response.json(allSearchData.map(v => ({ slug: v.slug, title: v.title })).slice(0, 10))
  } else {
    const resArr: queryResType = []
    for (let i = 0; i < allSearchData.length; i++) {
      const post = allSearchData[i]
      let parentAdded = false
      if (post.title.indexOf(keyword) !== -1) {
        parentAdded = true
        resArr.push({
          slug: post.slug,
          title: post.title
        })
      }
      for (let j = 0; j < post.titleList.length; j++) {
        const inner = post.titleList[j]
        if (inner.title.indexOf(keyword) !== -1) {
          if(!parentAdded) {
            parentAdded = true
            resArr.push({
              slug: post.slug,
              title: post.title
            })
          }
          resArr.push({
            slug: post.slug,
            title: post.title,
            innerTitle: inner.title,
            innerSlug: inner.slug
          })
        }
      }
      if (resArr.length > 80) {
        break
      }
    }
    return Response.json(resArr)
  }
}