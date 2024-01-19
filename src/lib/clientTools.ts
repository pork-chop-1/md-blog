
/***
 * 去除两端空行
 */
export function clearSideBreaks(content: string) {
  const list = content.split(/\r?\n/)
  let start = 0, end = list.length - 1
  for(; start < list.length; start++) {
    if(list[start].length !== 0) {
      break
    }
  }
  for(; end >= 0; end--) {
    if(list[end].length !== 0) {
      break
    }
  }
  return list.slice(start, end + 1).join('\n')
}