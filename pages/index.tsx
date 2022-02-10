/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import {
    Box,
    Container,
    CssBaseline,
    Link,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import NavBar from "../components/NavBar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            height: "100%",
            minHeight: "100vh",
            marginBottom: -60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "& >*": {
                marginTop: theme.spacing(1),
                fontFamily: '"Roboto", "Noto Sans SC", sans-serif',
            },
        },
        title: {
            marginTop: theme.spacing(4),
        },
        avatar: {
            borderRadius: "50%",
            [theme.breakpoints.down("md")]: {
                width: 160,
                height: 160,
            },
            width: 280,
            height: 280,
        },
    })
);

export default function Home() {
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const isMobileSize = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            <Head>
                <title>{"张贺凯大傻逼"}</title>
                <meta
                    name={"description"}
                    content={"张贺凯小朋友傻逼到超乎你的想象"}
                />
                <link
                    rel={"preload"}
                    href={"https://q3.a1pic.cn/2022/02/08/M0wM.png"}
                    as={"image"}
                />
                <link rel="prefetch" href="//stat.ahdark.com" />
            </Head>

            <CssBaseline />
            <NavBar />
            <Container maxWidth={"lg"} fixed={true}>
                <Box className={classes.main}>
                    <img
                        src={"https://q3.a1pic.cn/2022/02/08/M0wM.png"}
                        alt="张贺凯"
                        className={classes.avatar}
                    />
                    <Typography
                        variant={"h3"}
                        component={"h1"}
                        className={classes.title}
                        align={"center"}
                    >
                        {"我是张贺凯"}
                        {isMobileSize ? <span>{"，"}</span> : <br />}
                        {"我为傻逼代言"}
                    </Typography>
                    <Typography
                        variant={"body1"}
                        component={"p"}
                        align={"center"}
                    >
                        {
                            "我是一个五年级的傻逼小学生，希望这世界上没人和我一样傻逼。"
                        }
                    </Typography>
                    <Typography
                        variant={"body1"}
                        component={"p"}
                        align={"center"}
                        fontWeight={"bold"}
                    >
                        {"千万不要买我的服务器，我"}
                        <span style={{ color: "#FF0000" }}>
                            {"每三天就必须跑路一次"}
                        </span>
                        {"，没办法，生理需求。"}
                    </Typography>
                    <Typography
                        variant={"body1"}
                        component={"p"}
                        align={"center"}
                    >
                        {
                            "I'm mentally retarded and I like sucking other people's dicks."
                        }
                    </Typography>
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
