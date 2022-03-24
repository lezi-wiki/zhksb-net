import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { RouteData } from "../../router";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import Head from "next/head";
import { RouteDataItem } from "../../types/RouteDataType";
import NavItem from "./NavItem";
import NextLink from "next/link";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 100,
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

    const [thisRoute, setRoute] = useState<RouteDataItem>(RouteData[0]);
    useEffect(() => {
        for (let i = 0; i < RouteData.length; i++) {
            if (RouteData[i].path == router.pathname) {
                console.log("[Route] get route data success");
                setRoute(RouteData[i]);
                break;
            }
        }
    }, [router.pathname]);

    const theme = useTheme<Theme>();
    const classes = useStyles();

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState<boolean>(!isSmallScreen);

    useEffect(() => {
        console.log(`[UI] Small screen ${isSmallScreen.toString()}`);
        setDrawerOpen(!isSmallScreen);
    }, [isSmallScreen]);

    const handleDrawer = () => {
        console.log(
            "[UI] Drawer from " +
                drawerOpen.toString() +
                " to " +
                (!drawerOpen).toString()
        );
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <Head>
                <title>{thisRoute.name + " - 评论张大佬"}</title>
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
                    PaperProps={{
                        className: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            {RouteData.map((item, index) => (
                                <NavItem item={item} key={index} />
                            ))}
                            <Divider />
                            <Link
                                href={"https://blog.zhksb.net"}
                                rel={"noopener self"}
                                target={"_blank"}
                                underline={"none"}
                                color={"inherit"}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <BookRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Blog"} />
                                </ListItem>
                            </Link>
                            <Link
                                href={"https://zhk.nmsl.sb"}
                                rel={"noopener self"}
                                target={"_blank"}
                                underline={"none"}
                                color={"inherit"}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeRepairServiceRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"ToolBox"} />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                </Drawer>
            </Box>
        </>
    );
}
