import type {AppProps} from 'next/app';

import ClientOnly from '@components/ClientOnly';
import {Navigation} from '@components/organism';
import {ThemeProvider} from '@lib/styled-components';
import theme, {ColorScheme} from '@styles/theme';
import '@styles/global.css';

const MyApp = ({Component, pageProps}: AppProps) => (
  <ThemeProvider theme={theme[ColorScheme.LIGHT]}>
    <ClientOnly>
      <Navigation />
      <div className="content">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </div>
    </ClientOnly>
  </ThemeProvider>
);

export default MyApp;
