/* eslint-disable import/no-extraneous-dependencies */
import {render, RenderOptions} from '@testing-library/react';
import React, {ReactElement, ReactNode} from 'react';

import {QueryClient, QueryClientProvider} from '@lib/react-query';
import {RecoilRoot} from '@lib/recoil';
import {ThemeProvider} from '@lib/styled-components';
import theme from '@styles/theme';

const matchMediaMock = jest.fn().mockReturnValue({
  matches: true,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
});

beforeAll(() => {
  window.matchMedia = matchMediaMock;
});

const queryClient = new QueryClient();
const Providers = ({children}: {children: ReactNode}) => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme.light}>{children}</ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: Providers, ...options});

export * from '@testing-library/react';
export {customRender as render};
