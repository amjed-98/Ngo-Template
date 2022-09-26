import { useEffect } from 'react'
import { type DefaultTheme, ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { Loader } from 'components'
import AllRoute from 'app/router'
import { CrashPage } from 'Pages'
import { getOngByUrl, getOngConfig } from 'api/getApiServices'
import {
  useFetch, useAppDispatch, useSetFavIcon, useSetDocumentTitle
} from 'hooks'
import { setOngConfig, setOngId } from 'redux/ongConfigSlice'

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
  }, [ongData, ongId])

  const primary = ongData?.brand.primary_color_hex || ''
  const secondary = ongData?.brand.secondary_color_hex || ''
  const theme: DefaultTheme = { primary, secondary }

  if (isError || isErrorPage || ongId === undefined) return <CrashPage />

  if (isLoadingOngConfig || isLoadingPlatformConfig) {
    return (
      <ThemeProvider theme={theme}>
        <Loader />
      </ThemeProvider>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <AllRoute />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
