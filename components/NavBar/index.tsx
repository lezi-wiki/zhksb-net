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
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import NavItem from "./NavItem";
import NextLink from "next/link";
import { useAppSelector } from "../../store/hooks";
import MenuIcon from "@mui/icons-material/MenuRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import ForumIcon from "@mui/icons-material/ForumRounded";

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
    const theme = useTheme<Theme>();
    const classes = useStyles();

    const title = useAppSelector((state) => state.view.title);

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
                            {title || "ZHKSB.net"}
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
                        <NavItem name={"Home"} icon={HomeIcon} path={"/"} />
                        <NavItem
                            name={"Comment"}
                            icon={ForumIcon}
                            path={"/comment"}
                        />
                        <Divider />
                        <Link
                            href={"https://blog.zhksb.net"}
                            rel={"noopener self"}
                            target={"_blank"}
                            underline={"none"}
                            color={"inherit"}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <BookRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Blog"} />
                            </ListItemButton>
                        </Link>
                    </List>
                </div>
            </Drawer>
        </Box>
    );
}
