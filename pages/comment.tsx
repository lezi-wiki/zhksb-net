import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Box, Container, CssBaseline, Theme, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import Waline from "../components/Waline";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(8),
        },
        main: {
            paddingTop: theme.spacing(4),
        },
        title: {
            textAlign: "center",
        },
        comment: {
            paddingTop: theme.spacing(6),
        },
    })
);

export default function Comment(): JSX.Element {
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Head>
                <meta name={"description"} content={"评论一下张大佬吧"} />
                <link
                    rel="preload"
                    href="https://q3.a1pic.cn/2022/02/08/M0wM.png"
                    as="image"
                />
                <link rel="prefetch" href="//stat.ahdark.com" />
            </Head>

            <CssBaseline />
            <NavBar />
            <Container maxWidth={"lg"} fixed={true} className={classes.root}>
                <Box className={classes.main}>
                    <Box className={classes.title}>
                        <Typography
                            variant={"h3"}
                            component={"h1"}
                            fontFamily={'"Roboto", "Noto Sans SC", sans-serif'}
                        >
                            {"评论"}
                        </Typography>
                    </Box>
                    <Waline path={router.pathname} />
                </Box>
                <Footer />
            </Container>
        </>
    );
}
