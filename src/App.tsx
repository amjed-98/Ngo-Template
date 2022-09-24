import { useEffect } from 'react'
import { type DefaultTheme, ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { getOngByUrl, getOngConfig } from './api/getApiServices'
import {
  useFetch, useAppDispatch, useSetFavIcon, useSetDocumentTitle
} from './hooks'
import { setOngConfig, setOngId } from './redux/ongConfigSlice'
import AllRoute from './app/router'
import { Loader } from './components'
import { CrashPage } from './Pages'

const ongUrl = ['development', 'staging'].includes(import.meta.env.MODE)
  ? 'prehelloo.web.lazzaro.io'
  : window.location.host

function App() {
  const dispatch = useAppDispatch()

  const {
    data: { ong_id: ongId = '' } = {},
    isLoading: isLoadingPlatformConfig,
    isError,
  } = useFetch<TPlatformConfig>(getOngByUrl(ongUrl), ['ongConfigUrl'], ongUrl)

  const {
    data: ongData,
    isLoading: isLoadingOngConfig,
    isError: isErrorPage,
  } = useFetch<TOngConfig>(getOngConfig(ongId), ['ongConfig'], ongId)

  useSetFavIcon(ongData?.brand.logo || '')
  useSetDocumentTitle(ongData?.brand.name)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('lang')

    if (!storedLanguage) {
      const ngoLanguage:TPlatformConfig['language'] = ongData?.platformConfig.language || 'es'
      localStorage.setItem('lang', ngoLanguage)
    }
  }, [ongData?.platformConfig.language])

  useEffect(() => {
    dispatch(setOngId(ongId))
    dispatch(setOngConfig(ongData))
  }, [dispatch, ongData, ongId])

  const primary = ongData?.brand.primary_color_hex || ''
  const secondary = ongData?.brand.secondary_color_hex || ''
  const theme: DefaultTheme = { primary, secondary }

  if (isError || isErrorPage || ongId === undefined) return <CrashPage />

  return (
    <ThemeProvider theme={theme}>
      {isLoadingOngConfig || isLoadingPlatformConfig ? (
        <Loader />
      ) : (
        <>
          <AllRoute />
          <ToastContainer />
        </>
      )}
    </ThemeProvider>
  )
}

export default App
