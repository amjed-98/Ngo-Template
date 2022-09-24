import { useLayoutEffect } from 'react'

const useSetDocumentTitle = (title = 'Loading...') => {
  useLayoutEffect(() => {
    document.title = title
  }, [title])
}

export default useSetDocumentTitle
