import { useLayoutEffect } from 'react'

const useSetDocumentTitle = (title: string | undefined = 'Loading...') => {
  useLayoutEffect(() => {
    document.title = title
  }, [title])
}

export default useSetDocumentTitle
