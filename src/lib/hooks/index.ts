import { useCallback, useState } from "react";

// https://github.com/uidotdev/usehooks/blob/main/index.js
export function useCopyToClipBoard()
  : [string | undefined, (value: string) => void] {
  const [state, setState] = useState<string | undefined>()

  const copyMemo = useCallback((value: string) => {
    const copy = async (value: string) => {
      if (navigator?.clipboard?.writeText != null) {
        await navigator.clipboard.writeText(value)
      } else {
        const tmpTextArea = document.createElement('textarea')
        tmpTextArea.value = value
        document.body.appendChild(tmpTextArea)
        tmpTextArea.select()
        document.execCommand('copy')
        document.body.removeChild(tmpTextArea)
      }
      setState(value)
    }
    copy(value)
  }, [])

  return [state, copyMemo]
}