/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Box, Container, CssBaseline, Theme, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import counter, { increment } from "../store/counter";

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
    const count = useAppSelector((store) => store.counter);
    const dispatch = useAppDispatch();

    return (
        <>
            <Head>
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
                    {/*
					 <img
					 src={"https://q3.a1pic.cn/2022/02/08/M0wM.png"}
					 alt="张贺凯"
					 className={classes.avatar}
					 />
					 */}
                    <Typography
                        variant={"h3"}
                        component={"h1"}
                        className={classes.title}
                        align={"center"}
                    >
                        {"欢迎评论张大佬"}
                    </Typography>
                    <Typography
                        variant={"body1"}
                        component={"p"}
                        align={"center"}
                    >
                        {"侧边栏可通过左上角按钮控制开合    "}
                    </Typography>
                    {/*
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
					 */}
                </Box>
                <Footer />
            </Container>
        </>
    );
}
