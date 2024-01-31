import matter from 'gray-matter'
import fs from 'fs'
import { join } from 'path'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import GithubSlugger from 'github-slugger'
import { toString } from 'hast-util-to-string'

const _slashJoin = (...path: string[]) => {
  return join(...path).replaceAll('\\', '\/')
}

const slugs = new GithubSlugger()
const POST_ROOT = '_posts'

type dataType = { [key: string]: any }
type postDataType = { data: dataType, content: string }
type postType = { [slug: string]: postDataType }

export let allPosts: postType
export let allSearchData: {
  title: string,
  slug: string,
  titleList: { title: string, level: number, slug: string }[]
}[]

export function initPostData() {
  allPosts = getPostSlugs().reduce((postMap, path) => {
    const postData = _getPostBySlug(path)
    postData && (postMap[path] = postData)
    return postMap
  }, {} as postType)

  // search data
  allSearchData = []
  Object.keys(allPosts).map(slug => {
    slugs.reset()
    const post = allPosts[slug]
    const title = post.data.title as string
    const content = post.content
    const res = unified().use(remarkParse).parse(content)
    const titleList = res.children
      .filter((v) => v.type === 'heading')
      .map((v) => {
        // @ts-expect-error type not match
        const title = toString(v)
        // @ts-expect-error heading ast node contains depth
        return { title: title, level: v.depth, slug: `${process.env.NEXT_PUBLIC_ID_PREFIX}${slugs.slug(title)}` }
      })
      .filter((v) => [2, 3, 4].indexOf(v.level) !== -1)

    allSearchData.push({
      title,
      slug,
      titleList
    })
  })
}

// 获取post下所有文件名称
export function getPostSlugs() {
  const pathList: string[] = []
  function checkRevision(path: string) {
    const pathJoined = _slashJoin(process.cwd(), POST_ROOT, path)
    const folderPath = _getMdFileFolder(path)?.folderPath

    if (!folderPath) {
      const folders = fs.readdirSync(pathJoined)
      folders.forEach(v => checkRevision(_slashJoin(path, v)))
    } else {
      pathList.push(path)
    }
  }
  checkRevision('')
  return pathList
}

function _matchLastPath(path: string) {
  const match = [...path.matchAll(/^(.+)[\\\/](.+)$/g)]
  if (match.length === 0) {
    return ['', path]
  }
  return [match[0][1], match[0][2]]
}

/**
 * get relative folder md file path and folder path
 */
function _getMdFileFolder(path: string) {
  let filePath
  let folderPath

  let [parentFolder, folderName] = _matchLastPath(path)

  if (
    fs.existsSync(_slashJoin(process.cwd(), POST_ROOT, parentFolder, `${folderName}/${folderName}.md`))
  ) {
    filePath = _slashJoin(process.cwd(), POST_ROOT, parentFolder, `${folderName}/${folderName}.md`)
    folderPath = _slashJoin(process.cwd(), POST_ROOT, parentFolder, folderName)
  } else if (
    fs.existsSync(
      _slashJoin(process.cwd(), POST_ROOT, parentFolder, `${folderName}/index.md`),
    )
  ) {
    filePath = _slashJoin(process.cwd(), POST_ROOT, parentFolder, `${folderName}/index.md`)
    folderPath = _slashJoin(process.cwd(), POST_ROOT, parentFolder, folderName)
  }
  return { filePath, folderPath }
}

function _getPostBySlug(slug: string) {
  // 包含文件夹
  let postData: postDataType
  if (allPosts) {
    postData = allPosts[slug]
  } else {

    const filePath = _getMdFileFolder(slug)?.filePath

    if (!filePath) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    // matter: 读取md文件各种信息
    // data: 首部信息， content：余下信息
    postData = matter(fileContent) as postDataType
  }
  return postData
}

function _filterPostByFields<T extends string>(postData: postDataType, slug: string, fields: T[]) {
  const titleWithoutPostfix = slug.replace(/\.md$/, '')
  const { content, data } = postData
  const res: { [key in T]: any } = {} as { [key in T]: any }
  fields.forEach((field) => {
    if (field === 'content') {
      res[field] = content
    } else if (field === 'slug') {
      res[field] = titleWithoutPostfix
    } else if (field === 'date') {
      res[field] = new Date(data[field])
    } else if (field === 'tags') {
      res[field] = ((data[field] as string) || '').split(' ').filter(v => v !== '')
    } else if (data[field] != null) {
      res[field] = data[field]
    }
  })
  return res
}

/**
 * @param {string} slug
 * @param {string[]} fields
 * https://chat.openai.com/c/3907bd02-0b27-4232-a5b5-2ad3aa90eacd
 */
export function getPostBySlug<T extends string>(slug: string, fields: T[]) {
  const postData = _getPostBySlug(slug)

  if (!postData) {
    return null
  }
  return _filterPostByFields(postData, slug, fields)
}

/**
 * @param {string[]} fields
 */
export function getAllPosts<T extends string>({
  fields,
  limit = Infinity,
  offset = 0,
  orderBy = 'desc'
}: {
  fields: T[],
  limit?: number,
  offset?: number,
  orderBy?: 'asc' | 'desc'
}) {
  if (!allPosts) {
    initPostData()
  }

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

  return Object.keys(allPosts)
    .map(path => {
      // let [_, lastPath] = _matchLastPath(path)
      return _filterPostByFields(allPosts[path], path.replaceAll('\\', '\/'), fields)
    })
    .sort((l, r) => _compare(l, r))// 按时间从大到小排序
    .slice(offset, limit)
}

export function getTagMap() {
  const tagList: string[][] = getAllPosts({ fields: ['tags'] }).map(v => v.tags)
  const tagMap = tagList.reduce((prev, cur) => {
    cur.filter(v => v !== '').forEach(v => {
      prev[v] = (prev[v] || 0) + 1
    })
    return prev
  }, {} as { [key: string]: number })
  return tagMap
}

export function getPostsByTag(tag: string) {
  return getAllPosts({
    fields: ['tags', 'title', 'slug', 'date']
  }).filter(v =>
    (v.tags as string[]).find(_tag => tag === _tag) != null
  )
}

// todo move-----------------------
export function dealImagePath(image: string, slug: string): [path: string, isRelative: boolean] {
  let isRelative = false
  if (/^\.\//.test(image)) {
    image = `/assets/${slug}/${image.substring(2)}`
    isRelative = true
  }
  return [image, isRelative]
}
