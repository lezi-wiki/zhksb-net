import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    Link,
    List,
    Theme,
    Toolbar,
    Typography,
} from "@mui/material";
import { RouteData } from "../../router";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import Head from "next/head";
import { RouteDataItem } from "../../types/RouteDataType";
import NavItem from "./NavItem";
import NextLink from "next/link";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: "auto",
        },
    })
);

export default function NavBar() {
    const router = useRouter();

    let thisRoute: RouteDataItem = RouteData[0];
    for (let i = 0; i < RouteData.length; i++) {
        if (RouteData[i].path == router.pathname) {
            console.log("[Route]: get route data success");
            thisRoute = RouteData[i];
            break;
        }
    }

    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(true);

    const handleDrawer = () => {
        console.log(
            "[UI]: Drawer from " +
                drawerOpen.toString() +
                " to " +
                (!drawerOpen).toString()
        );
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <Head>
                <title>{thisRoute.name + " - 张贺凯大傻逼"}</title>
            </Head>
            <Box className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <NextLink href={"/"}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, cursor: "default" }}
                            >
                                {"ZHKSB.net"}
                            </Typography>
                        </NextLink>
                        <Link
                            href={"https://github.com/zhk-sb/zhk"}
                            rel={"noopener"}
                            underline={"none"}
                            color="inherit"
                        >
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            {RouteData.map((item, index) => (
                                <NavItem item={item} key={index} />
                            ))}
                        </List>
                    </div>
                </Drawer>
            </Box>
        </>
    );
}
