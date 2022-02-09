import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
    Box,
    Container,
    CssBaseline,
    Link,
    Theme,
    Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Script from "next/script";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(8)
        },
        main: {},
        title: {
            textAlign: "center"
        },
        comment: {
            paddingTop: theme.spacing(6)
        }
    })
);

export const getServerSideProps: GetServerSideProps = async (context) => ({
    props: {
        hostname: context.req.headers["host"],
    },
});

export default function Comment(props) {
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{"评论 - 张贺凯大傻逼"}</title>
                <meta
                    name={"description"}
                    content={"张贺凯小朋友傻逼到超乎你的想象"}
                />
                <link
                    rel="preload"
                    href="https://q3.a1pic.cn/2022/02/08/M0wM.png"
                    as="image"
                />
                <link rel="prefetch" href="//stat.ahdark.com" />
            </Head>
            <Script
                src={
                    "https://npm.sourcegcdn.com/@waline/client@1.5.4/dist/Waline.min.js"
                }
                strategy="beforeInteractive"
                id={"Waline"}
            />
            <Script strategy="afterInteractive" id={"Waline-config"}>
                {`
                    Waline({
                        el: "#comment",
                        serverURL: "https://comment.zhksb.net",
                        path: "${props.hostname}${router.pathname}",
                        lang: "${router.locale}",
                        emoji: ["https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tw-emoji"],
                        requiredMeta: ['nick', 'mail']
                    })
                `}
            </Script>

            <CssBaseline />
            <Container maxWidth={"lg"} fixed={true} className={classes.root}>
                <Box className={classes.main}>
                    <Box className={classes.title}>
                        <Typography variant={"h3"} component={"h1"} fontFamily={'"Roboto", "Noto Sans SC", sans-serif'}>
                            {"评论"}
                        </Typography>
                    </Box>
                    <Box id={"comment"} className={classes.comment}>{""}</Box>
                </Box>
                <Box component={"footer"} textAlign={"center"}>
                    <Link
                        href={"https://github.com/zhk-sb/zhk"}
                        rel={"noopener"}
                        underline={"none"}
                        color={"inherit"}
                    >
                        <img
                            src={
                                "https://img.shields.io/github/stars/zhk-sb/zhk?style=social"
                            }
                            style={{ height: 20, width: 76 }}
                            alt={"stars"}
                        />
                    </Link>
                    <Typography variant={"body2"} component={"p"}>
                        {"Copyright © 2022 "}
                        <Link
                            href={"https://ahdark.com/live/1240.shtml"}
                            fontFamily={'"Noto Sans SC", sans-serif'}
                            underline={"none"}
                            rel={"self noopener"}
                            target={"_blank"}
                        >
                            {"黑科技工具屋"}
                        </Link>
                        {" All Right Reserved."}
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
