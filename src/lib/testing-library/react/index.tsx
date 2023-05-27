/* eslint-disable import/no-extraneous-dependencies */
import {render, RenderOptions} from '@testing-library/react';
import React, {ReactElement, ReactNode} from 'react';

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

const Providers = ({children}: {children: ReactNode}) => (
  <RecoilRoot>
    <ThemeProvider theme={theme.light}>{children}</ThemeProvider>
  </RecoilRoot>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: Providers, ...options});

export * from '@testing-library/react';
export {customRender as render};
