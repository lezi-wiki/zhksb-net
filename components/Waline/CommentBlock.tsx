import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Link,
    Theme,
    Typography,
} from "@mui/material";
import { CommentData } from "../../model/Comment/commentListType";
import dayjs from "dayjs";
import Markdown from "markdown-to-jsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        card: {
            margin: `${theme.spacing(1)} 0`,
        },
        content: {
            "& *": {
                margin: 0,
                padding: 0,
            },
            "& a": {
                textDecoration: "none",
                color: theme.palette.primary.main,
            },
            "& ul,ol": {
                paddingLeft: theme.spacing(3),
            },
        },
    })
);

export default function CommentBlock(props: { data: CommentData }) {
    const classes = useStyles();
    const time = dayjs(props.data.insertedAt);

    return (
        <Card className={classes.card} component={"article"}>
            <CardHeader
                avatar={
                    <Avatar
                        src={props.data.avatar.replace(
                            RegExp("s=\\d+", "ig"),
                            "s=48"
                        )}
                        alt={"Avatar"}
                    />
                }
                title={
                    <>
                        {props.data.link ? (
                            <Link
                                href={props.data.link}
                                color={"inherit"}
                                underline={"none"}
                                rel={"ugc noopener nofollower"}
                            >
                                <Typography
                                    variant={"subtitle1"}
                                    component={"span"}
                                >
                                    {props.data.nick}
                                </Typography>
                            </Link>
                        ) : (
                            <Typography
                                variant={"subtitle1"}
                                component={"span"}
                            >
                                {props.data.nick}
                            </Typography>
                        )}
                        <Typography
                            variant={"subtitle2"}
                            component={"span"}
                            sx={{ color: "#b9b9b9", ml: 1 }}
                            fontWeight={"normal"}
                        >
                            {time.format("YYYY/MM/DD HH:mm")}
                        </Typography>
                    </>
                }
                subheader={
                    <>
                        <Chip
                            label={props.data.os}
                            sx={{ mr: 1 }}
                            size={"small"}
                        />
                        <Chip
                            label={
                                props.data.browser.replace(
                                    RegExp("([\\d.]+)$"),
                                    " $1"
                                ) /* 版本号加空格 */
                            }
                            size={"small"}
                        />
                    </>
                }
            />
            <CardContent sx={{ pt: 0, pb: 0 }} component={"main"}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    className={classes.content}
                >
                    <Markdown>{props.data.comment}</Markdown>
                </Typography>
            </CardContent>
        </Card>
    );
}
