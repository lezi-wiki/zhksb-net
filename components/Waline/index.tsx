import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Link,
    Pagination,
    Paper,
    SvgIcon,
    TextField,
    Theme,
} from "@mui/material";
import type CommentSubmitType from "../../model/Comment/commentSubmitType";
import cookie from "react-cookies";
import Masonry from "@mui/lab/Masonry";
import { useRouter } from "next/router";
import CommentBlock from "./CommentBlock";
import {
    useGetCountQuery,
    useListCommentsQuery,
    useSendCommentMutation,
} from "../../service/CommentInfo";
import { useSnackbar } from "notistack";

const style = {
    border: "1px solid",
    bgColor: "#f0f0f0",
    boxShadow: "none",
    textColor: "#444",
};

type inputMetaType = {
    name: "nick" | "mail" | "link";
    describe: string;
    type: string;
    isMustInput: boolean;
};

const inputMeta: inputMetaType[] = [
    {
        name: "nick",
        describe: "昵称",
        type: "text",
        isMustInput: true,
    },
    {
        name: "mail",
        describe: "邮箱",
        type: "email",
        isMustInput: true,
    },
    {
        name: "link",
        describe: "站点",
        type: "url",
        isMustInput: true,
    },
];

const labelWidth = Number((1000 / inputMeta.length).toFixed()) / 10;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "left",
            "& *": {
                boxSizing: "content-box",
                lineHeight: 1.75,
            },
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        editor: {
            position: "relative",
            display: "flex",
            marginBottom: "0.75em",
            flexDirection: "column",
        },
        editorDiv: {
            position: "relative",
            flexShrink: 1,
            margin: "0.5em",
            border: "none",
            borderRadius: "0.75em",
            background: "#FFF",
            boxShadow: style.boxShadow,
        },
        info: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "baseline",
            padding: "0 4px",
            borderBottom: "2px dashed var(--waline-border-color)",
            borderTopLeftRadius: "0.75em",
            borderTopRightRadius: "0.75em",
            overflow: "hidden",
            paddingTop: theme.spacing(1.5),
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        infoItem: {
            width: labelWidth + "%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
        },
        input: {
            flex: 1,
            maxWidth: "100%",
            border: "none",
            color: style.textColor,
            outline: "none",
            margin: theme.spacing(1),
        },
        textarea: {
            margin: "0 12px",
            width: "calc(100% - 24px)",
            marginTop: theme.spacing(1),
        },
        footer: {
            margin: 12,
            marginTop: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
        },
        footerLeft: {
            "& >*": {
                margin: "0 2px",
            },
        },
        footerRight: {},
        notice: {
            marginBottom: theme.spacing(2),
        },
        loading: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignContent: "center",
            alignItems: "center",
            margin: `${theme.spacing(8)} 0`,
        },
        pageControl: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
        },
        pageButton: {
            minWidth: 30,
            paddingTop: theme.spacing(0.5),
            paddingBottom: theme.spacing(0.5),
        },
    })
);

const MarkdownIcon = (props?: any) => {
    return (
        <SvgIcon {...props} viewBox="0 0 1280 1024">
            <path
                d="M1187.7 905.84H92.3C41.4 905.84 0 864.44 0 813.54V210.46c0-50.9 41.4-92.3 92.3-92.3h1095.38c50.9 0 92.3 41.4 92.3 92.3v603.08c0.02 50.9-41.38 92.3-92.28 92.3z m-880-184.6v-240l123.08 153.84 123.08-153.84v240h123.08V302.76h-123.08l-123.08 153.84-123.08-53.84H184.62v418.46h123.08zM1132.3 512h-123.08V302.76h-123.08V512h-123.08l184.62 215.38L1132.3 512z"
                fill=""
                p-id="2049"
            />
        </SvgIcon>
    );
};

// Cookie操作
const cookieSave = (name: string, value: string) => {
    cookie.save(
        "comment-data",
        {
            ...cookie.load("comment-data"),
            [name]: value,
        },
        {
            path: "/",
        }
    );
};
const cookieLoad: (name: string) => any = (name: string) => {
    return Object(cookie.load("comment-data"))[name];
};

export default function Waline(props: { path: string }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    // 评论数据
    const [options, setOptions] = useState<CommentSubmitType>({
        ua: cookieLoad("ua"),
        comment: "",
        link: cookieLoad("link") || "",
        mail: cookieLoad("mail") || "",
        nick: cookieLoad("nick") || "",
        pid: null,
        rid: null,
        url: props.path,
        at: null,
    });

    // 获取浏览器UA
    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        setOptions({
            ...options,
            ua: userAgent,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 分页系统
    const router = useRouter();
    const [page, setPage] = useState<number>(Number(router.query.page) || 1);

    // 后端数据
    const { data, isLoading, refetch } = useListCommentsQuery({
        path: options.url,
        page: page,
        pageSize: 10,
    });

    useEffect(() => {
        console.log("[Waline]", "It is in page " + page + " now.");
    }, [page]);

    const { data: totalPage, isLoading: isCounting } = useGetCountQuery({
        page: -1,
        pageSize: 10,
        path: options.url,
    });

    const handleChange =
        (name: string, isSave?: boolean) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (isSave) {
                cookieSave(name, event.target.value);
            }
            setOptions({
                ...options,
                [name]: event.target.value,
            });
        };

    const [sendComment, { isLoading: isSending }] = useSendCommentMutation();

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!options.comment || options.comment.trim().length < 2) {
            enqueueSnackbar("评论内容过短", {
                variant: "error",
            });
            return;
        }
        if (!options.nick || options.nick.trim().length < 2) {
            enqueueSnackbar("昵称过短", {
                variant: "error",
            });
            return;
        }
        if (!options.nick || options.nick.trim().length > 20) {
            enqueueSnackbar("昵称过长", {
                variant: "error",
            });
            return;
        }
        if (
            !options.mail ||
            options.mail.trim().length < 6 ||
            !new RegExp("^[\\w-.]+@[\\w-]+.[\\w-.]+$").test(options.mail)
        ) {
            enqueueSnackbar("邮箱不合法", {
                variant: "error",
            });
            return;
        }

        sendComment({
            ...options,
            link: options.link ? options.link : null,
            pid: options.pid === 0 ? null : options.pid,
            rid: options.rid === 0 ? null : options.rid,
            at: null,
        })
            .unwrap()
            .then(() => {
                refetch();
                enqueueSnackbar("评论成功", {
                    variant: "success",
                });
                setOptions({
                    ...options,
                    comment: "",
                });
            })
            .catch((error) => {
                enqueueSnackbar(String(error), {
                    variant: "error",
                });
            });
    };

    if (isLoading || isCounting) {
        return (
            <Box className={classes.loading}>
                <CircularProgress size={48} />
            </Box>
        );
    }

    return (
        <Fragment>
            <Box className={classes.root}>
                <Alert severity="info" className={classes.notice}>
                    <AlertTitle>注意</AlertTitle>
                    <Box component={"ul"} sx={{ margin: 0, paddingLeft: 2.5 }}>
                        <Box component={"li"}>
                            {"本评论系统兼容Markdown语法"}
                        </Box>
                        <Box component={"li"}>{"请不要大量发表重复内容。"}</Box>
                    </Box>
                </Alert>
                <Paper className={classes.editor}>
                    <Box component={"form"} onSubmit={submit}>
                        <Box className={classes.editorDiv} id={"editor"}>
                            <TextField
                                id="comment"
                                label={options.pid === 0 ? "评论" : "回复"}
                                multiline
                                rows={5}
                                className={classes.textarea}
                                onChange={handleChange("comment")}
                                value={options["comment"] || ""}
                            />
                            <Box className={classes.info}>
                                {inputMeta.map((value, index) => (
                                    <Box
                                        className={classes.infoItem}
                                        key={index}
                                    >
                                        <TextField
                                            name={value.name}
                                            type={value.type}
                                            className={classes.input}
                                            label={value.describe}
                                            onChange={handleChange(
                                                value.name,
                                                true
                                            )}
                                            value={options[value.name] || ""}
                                        />
                                    </Box>
                                ))}
                            </Box>
                            <Box className={classes.footer}>
                                <Box className={classes.footerLeft}>
                                    <Link
                                        href={
                                            "https://guides.github.com/features/mastering-markdown/"
                                        }
                                        target={"_blank"}
                                        rel={"noopener"}
                                    >
                                        <IconButton title={"Markdown Support"}>
                                            <MarkdownIcon />
                                        </IconButton>
                                    </Link>
                                </Box>
                                <Box className={classes.footerRight}>
                                    <Button
                                        variant="contained"
                                        type={"submit"}
                                        disabled={isSending}
                                    >
                                        {"提交"}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
                {/* 评论列表 */}
                {isLoading ? (
                    <Box className={classes.loading}>
                        <CircularProgress size={48} />
                    </Box>
                ) : (
                    <Masonry
                        columns={{ md: 2, xs: 1 }}
                        spacing={1}
                        sx={{ margin: 0, my: 2 }}
                    >
                        {typeof data !== "undefined" &&
                            data.map((value, index) => (
                                <CommentBlock data={value} key={index} />
                            ))}
                    </Masonry>
                )}
                {/* 页面控制 */}
                <Paper className={classes.pageControl}>
                    <Pagination
                        className={classes.pageButton}
                        count={totalPage}
                        page={page}
                        onChange={(
                            event: React.ChangeEvent<unknown>,
                            value: number
                        ) => {
                            setPage(value);
                        }}
                    />
                </Paper>
            </Box>
        </Fragment>
    );
}
