import { render, renderHook } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Providers from '../providers';
import 'i18n/config';

const customRender = (ui: any, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed

    wrapper: ({ children }) => (
      <Providers>
        <ThemeProvider theme={{ primary: 'red', secondary: 'black' }}>{children}</ThemeProvider>
      </Providers>
    ),

    ...options,
  });

const customRenderHook = (hook: any, options = {}) =>
  renderHook(hook, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,

    ...options,
  });

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

// override render export

export { customRender as render };
export { customRenderHook as renderHook };
