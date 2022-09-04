import { useEffect } from 'react'

const useSetFavIcon = (url: string):void => {
  useEffect(() => {
    const favIcon: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link')

    favIcon.type = 'image/x-icon'
    favIcon.rel = 'shortcut icon'
    favIcon.href = url
    document.getElementsByTagName('head')[0].appendChild(favIcon)
  }, [url])
}
export default useSetFavIcon
