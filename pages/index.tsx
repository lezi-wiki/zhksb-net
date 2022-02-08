import Head from "next/head";
import Image from "next/image";
import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Box, Container, CssBaseline, Theme, Typography } from "@mui/material";
import avatarPic from "../public/avatar.png";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            height: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -50,
            "& >*": {
                marginTop: theme.spacing(1),
            },
        },
        title: {
            marginTop: theme.spacing(4),
        },
        avatar: {
            borderRadius: "50%",
        },
    })
);

export default function Home() {
    const classes = useStyles();
    return (
        <>
            <Head>
                <title>{"张贺凯大傻逼"}</title>
                <meta
                    name={"description"}
                    content={"张贺凯小朋友傻逼到超乎你的想象"}
                />
            </Head>

            <CssBaseline />
            <Container maxWidth={"lg"} fixed={true}>
                <Box className={classes.main}>
                    <Image
                        src={avatarPic}
                        alt="张贺凯"
                        width={280}
                        height={280}
                        className={classes.avatar}
                        priority
                    />
                    <Typography
                        variant={"h3"}
                        component={"h1"}
                        className={classes.title}
                        align={"center"}
                    >
                        {"我是张贺凯，我为傻逼代言"}
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
            </Container>
        </>
    );
}
