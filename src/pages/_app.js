import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import seo from '../../seo-config';

import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <CSSReset />
        <DefaultSeo {...seo} />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
