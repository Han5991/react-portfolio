import type {AppProps} from 'next/app';

import ClientOnly from '@components/ClientOnly';
import {NavBar} from '@components/organism';
import {useThemeMode} from '@hooks/media';
import {SessionProvider} from '@lib/next-auth/react';
import {QueryClient, QueryClientProvider, Hydrate} from '@lib/react-query';
import {RecoilRoot} from '@lib/recoil';
import {ThemeProvider} from '@lib/styled-components';
import GlobalStyle from '@styles/global-styles';
import theme, {ColorScheme} from '@styles/theme';

const queryClient = new QueryClient();

const MyApp = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
  const themeMode = useThemeMode();

  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider
              theme={
                theme[
                  themeMode === 'dark' ? ColorScheme.DARK : ColorScheme.LIGHT
                ]
              }>
              <GlobalStyle />
              <ClientOnly>
                <NavBar />
                <div className="content">
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <Component {...pageProps} />
                </div>
              </ClientOnly>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </RecoilRoot>
  );
};

export default MyApp;
