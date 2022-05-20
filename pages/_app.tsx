import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/styles";
import { theme } from "../theme";
import React, { Component, FC, useEffect } from "react";
import Script from "next/script";
import { wrapper } from "../store/store";
import createCache, { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import { useAppSelector } from "../store/hooks";
import { SnackbarProvider } from "notistack";

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
    const title = useAppSelector<string | null>((state) => state.view.title);

    useEffect(() => {
        window.document.title = title !== null ? `${title} - ZHKSB` : "ZHKSB";
    }, [title]);

    return (
        <>
            <Head>
                <title>{title !== null ? `${title} - ZHKSB` : "ZHKSB"}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        autoHideDuration={2000}
                    >
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </ThemeProvider>
            </CacheProvider>
            <Script id={"matomo"} strategy="lazyOnload">
                {`var _paq=window._paq=window._paq||[];
_paq.push(["setCookieDomain","*.www.zhksb.net"]);
_paq.push(["setDomains",["*.www.zhksb.net","*.zhksb.net"]]);
_paq.push(["enableCrossDomainLinking"]);
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function(){
    var u="https://stat.ahdark.com/";
    _paq.push(["setTrackerUrl",u+"matomo.php"]);
    _paq.push(["setSiteId","14"]);
    var d=document,g=d.createElement("script"),s=d.getElementsByTagName("script")[0];
    g.async=true;
    g.src=u+"matomo.js";
    s.parentNode.insertBefore(g,s)
})();`}
            </Script>
        </>
    );
};

export default wrapper.withRedux(MyApp);
