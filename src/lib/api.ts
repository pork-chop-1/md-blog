import matter from 'gray-matter'
import fs from 'fs'
import { join } from 'path'

// 获取post下所有文件名称
export function getPostSlugs() {
  return fs.readdirSync(join(process.cwd(), '_posts'))
}

/**
 * @param {string} slug
 * @param {string[]} fields
 * https://chat.openai.com/c/3907bd02-0b27-4232-a5b5-2ad3aa90eacd
 */
export function getPostBySlug<T extends string>(slug: string, fields: T[]) {
  const titleWithoutPostfix = slug.replace(/\.md$/, '')
  // 包含文件夹
  let filePath
  if (
    fs.existsSync(join(process.cwd(), '_posts', `${titleWithoutPostfix}.md`))
  ) {
    filePath = join(process.cwd(), '_posts', `${titleWithoutPostfix}.md`)
  } else if (
    fs.existsSync(
      join(process.cwd(), '_posts', `${titleWithoutPostfix}/index.md`),
    )
  ) {
    filePath = join(process.cwd(), '_posts', `${titleWithoutPostfix}/index.md`)
  } else if (
    fs.existsSync(
      join(
        process.cwd(),
        '_posts',
        `${titleWithoutPostfix}/${titleWithoutPostfix}.md`,
      ),
    )
  ) {
    filePath = join(
      process.cwd(),
      '_posts',
      `${titleWithoutPostfix}/${titleWithoutPostfix}.md`,
    )
  }

  if (!filePath) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  // matter: 读取md文件各种信息
  // data: 首部信息， content：余下信息
  const { data, content } = matter(fileContent)

  const res: { [key in T]: any } = {} as { [key in T]: any }
  fields.forEach((field) => {
    if (field === 'content') {
      res[field] = content
    } else if (field === 'slug') {
      res[field] = titleWithoutPostfix
    } else if (field === 'date') {
      res[field] = new Date(data[field])
    } else if (field === 'tags') {
      res[field] = (data[field] as string).split(' ').filter(v => v !== '')
    } else if (data[field] != null) {
      res[field] = data[field]
    }
  })
  return res
}

const UPDATE_GAP = 5
let allPosts: unknown
let prevTime = 0

/**
 * @param {string[]} fields
 */
export function getAllPosts<T extends string>({
  fields,
  limit = Infinity,
  offset = 0,
  orderBy = 'asc'
}: {
  fields: T[],
  limit?: number,
  offset?: number,
  orderBy?: 'asc' | 'desc'
}) {
  // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
  // https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
  let compareFn = (l: any, r: any) => {
    if (!l || !l.date) {
      return -1
    }
    if (!r || !r.date) {
      return 1
    }
    return l.date.getTime() - r.date.getTime()
  }
  let _compare = compareFn
  if (orderBy === 'desc') {
    _compare = (l: any, r: any) => -compareFn(l, r)
  }

  if (Date.now() - prevTime < UPDATE_GAP * 1000) {
    prevTime = Date.now()
  } else {
    allPosts = getPostSlugs()
      .map((slug) => {
        return getPostBySlug(slug, fields)
      })
  }

  return (allPosts as ({ [key in T]: any; } | null)[])
    .filter((v): v is { [key in T]: any } => v != null) // notice! predicate v is 
    .sort((l, r) => _compare(l, r))// 按时间从大到小排序
    .slice(offset, limit)
}

export function getTagMap() {
  const tagList: string[] = getAllPosts({ fields: ['tags'] }).map(v => v.tags)
  const tagMap = tagList.reduce((prev, cur) => {
    cur.split(' ').filter(v => v !== '').forEach(v => {
      prev[v] = (prev[v] || 0) + 1
    })
    return prev
  }, {} as { [key: string]: any })
  return tagMap
}

export function dealImagePath(image: string, slug: string) {
  if (/^\.\//.test(image)) {
    image = `/assets/${slug}/${image.substring(2)}`
  }
  return image
}