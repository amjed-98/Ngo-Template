import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactQueryProvider from 'queryclient';

type TProps = {
  children: ReactNode;
};
const Providers = ({ children }: TProps) => (
  <BrowserRouter>
    <ReactQueryProvider>
      {children}
      {import.meta.env.MODE === 'development' && <ReactQueryDevtools />}
    </ReactQueryProvider>
  </BrowserRouter>
);

export default Providers;
