import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/styles";
import { theme } from "../theme";
import "@fontsource/roboto";
import "@fontsource/noto-sans-sc";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

