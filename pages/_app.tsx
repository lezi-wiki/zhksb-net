import type { AppProps }             from "next/app";
import { ThemeProvider }             from "@mui/styles";
import { theme }                     from "../theme";
import "@fontsource/roboto";
import "@fontsource/noto-sans-sc";
import React, { Component, FC }      from "react";
import Script                        from "next/script";
import { wrapper }                   from "../store/store";
import createCache, { EmotionCache } from "@emotion/cache";
import { CacheProvider }             from '@emotion/react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
    return createCache({ key: "css", prepend: true });
}

const MyApp: FC<
    AppProps & {
        emotionCache?: EmotionCache;
    }
> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
    return (
        <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
            <Script id={"matomo"} strategy="afterInteractive">
                {`var _paq=window._paq=window._paq||[];_paq.push(["setCookieDomain","*.www.zhksb.net"]);_paq.push(["setDomains",["*.www.zhksb.net","*.zhksb.net"]]);_paq.push(["enableCrossDomainLinking"]);_paq.push(["trackPageView"]);_paq.push(["enableLinkTracking"]);(function(){var u="https://stat.ahdark.com/";_paq.push(["setTrackerUrl",u+"matomo.php"]);_paq.push(["setSiteId","14"]);var d=document,g=d.createElement("script"),s=d.getElementsByTagName("script")[0];g.async=true;g.src=u+"matomo.js";s.parentNode.insertBefore(g,s)})();`}
            </Script>
            <Component {...pageProps} />
        </ThemeProvider>
        </CacheProvider>
    );
};

export default wrapper.withRedux(MyApp);
