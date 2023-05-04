'use client';

import {Inter} from 'next/font/google';
import React, {ReactNode} from 'react';

import {ThemeProvider, StyledComponentsRegistry} from '@lib/styled-components';
import '@styles/global.css';
import theme, {ColorScheme} from '@styles/theme';

const inter = Inter({subsets: ['latin']});

const RootLayout = ({children}: {children: ReactNode}) => (
  <html lang="ko">
    <ThemeProvider theme={theme[ColorScheme.LIGHT]}>
      <StyledComponentsRegistry>
        <body className={inter.className}>{children}</body>
      </StyledComponentsRegistry>
    </ThemeProvider>
  </html>
);

export default RootLayout;
