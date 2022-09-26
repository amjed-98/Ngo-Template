import type { ReactNode } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from 'queryclient'
import { store } from 'redux/store'

type TProps = {
    children: ReactNode
}
const Providers = ({ children }: TProps) => (
  <BrowserRouter>
    <StoreProvider store={store}>
      <ReactQueryProvider>
        {children}
        <ReactQueryDevtools />
      </ReactQueryProvider>
    </StoreProvider>
  </BrowserRouter>
)

export default Providers
