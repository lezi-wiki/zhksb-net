import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/styles";
import { theme } from "../theme";
import "@fontsource/roboto";
import "@fontsource/noto-sans-sc";
import React, { Component } from "react";
import Script from "next/script";

export default class MyApp extends Component<AppProps> {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Script id={"matomo"} strategy="afterInteractive">
                    {`var _paq=window._paq=window._paq||[];_paq.push(["setCookieDomain","*.www.zhksb.net"]);_paq.push(["setDomains",["*.www.zhksb.net","*.zhksb.net"]]);_paq.push(["enableCrossDomainLinking"]);_paq.push(["trackPageView"]);_paq.push(["enableLinkTracking"]);(function(){var u="https://stat.ahdark.com/";_paq.push(["setTrackerUrl",u+"matomo.php"]);_paq.push(["setSiteId","14"]);var d=document,g=d.createElement("script"),s=d.getElementsByTagName("script")[0];g.async=true;g.src=u+"matomo.js";s.parentNode.insertBefore(g,s)})();`}
                </Script>
                <Component {...pageProps} />
            </ThemeProvider>
        );
    }
}
