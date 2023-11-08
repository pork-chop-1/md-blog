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
    } else if (data[field] != null) {
      res[field] = data[field]
    }
  })
  return res
}

/**
 * @param {string[]} fields
 */
export function getAllPosts(fields: string[]) {
  // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
  // https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
  return getPostSlugs()
    .map((slug) => {
      return getPostBySlug(slug, fields)
    })
    .filter((v): v is { [key: string]: any } => v != null) // notice!
    .sort((l, r) => r.date?.localeCompare(l.date))
  // 按时间从大到小排序
}
