import type {AppProps} from 'next/app';
import {useState} from 'react';

import ClientOnly from '@components/ClientOnly';
import {NavBar} from '@components/organism';
import {useThemeMode} from '@hooks/media';
import {RecoilRoot} from '@lib/recoil';
import {ThemeProvider} from '@lib/styled-components';
import GlobalStyle from '@styles/global-styles';
import theme, {ColorScheme} from '@styles/theme';

const MyApp = ({Component, pageProps}: AppProps) => {
  const themeMode = useThemeMode();
  const [blur, setBlur] = useState(false);
  const showBlur = () => setBlur(true);
  const hideBlur = () => setBlur(false);
  return (
    <RecoilRoot>
      <ThemeProvider
        theme={
          theme[themeMode === 'dark' ? ColorScheme.DARK : ColorScheme.LIGHT]
        }>
        <GlobalStyle />
        <ClientOnly>
          <NavBar showBlur={showBlur} hideBlur={hideBlur} />
          <div className={`content${blur ? ' blurred' : ''}`}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </div>
        </ClientOnly>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
