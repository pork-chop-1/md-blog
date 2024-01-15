import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get('keyword')
  if(!keyword) {
    throw 'keyword required!'
  }
  
}