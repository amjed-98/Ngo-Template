import { useEffect } from 'react'
import { type DefaultTheme, ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { Loader } from 'components'
import AllRoute from 'app/router'
import { CrashPage } from 'Pages'
import { useSetFavIcon, useSetDocumentTitle, useAllPlatformConfig, } from 'hooks'

function App() {
  const {
    brand: {
      logo = '', name,
      primary_color_hex: primary = '',
      secondary_color_hex: secondary = ''
    } = {},
    platformConfig: { language: ngoLanguage = 'es' } = {},
    isLoading,
    isError,
  } = useAllPlatformConfig()

  useSetFavIcon(logo)
  useSetDocumentTitle(name || 'Loading...')

  useEffect(() => {
    const storedLanguage = localStorage.getItem('lang')

    if (!storedLanguage) {
      localStorage.setItem('lang', ngoLanguage)
    }
  }, [ngoLanguage])

  const theme: DefaultTheme = { primary, secondary }

  if (isError) return <CrashPage />

  if (isLoading) {
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
