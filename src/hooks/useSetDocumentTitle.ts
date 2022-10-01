import { useLayoutEffect } from 'react'

const useSetDocumentTitle = (title:string) => {
  useLayoutEffect(() => {
    document.title = title
  }, [title])
}

export default useSetDocumentTitle
