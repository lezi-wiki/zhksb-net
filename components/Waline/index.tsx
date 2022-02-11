import React, { FormEvent, useEffect, useState } from "react";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Grid,
    IconButton,
    Link,
    Paper,
    SvgIcon,
    TextField,
    Theme,
    useMediaQuery,
} from "@mui/material";
import WalineAPI from "../../middleware/WalineAPI";
import { CommentListType } from "../../types/Comment/CommentListType";
import { CommentSubmitType } from "../../types/Comment/CommentSubmitType";
import CommentBlock from "./CommentBlock";
import axios from "axios";
import cookie from "react-cookies";

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

const useStyles = (column: number) =>
    makeStyles((theme: Theme) =>
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
                padding: "0 4px",
                borderBottom: "2px dashed var(--waline-border-color)",
                borderTopLeftRadius: "0.75em",
                borderTopRightRadius: "0.75em",
                overflow: "hidden",
                paddingTop: theme.spacing(1.5),
            },
            infoItem: {
                width: labelWidth + "%",
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
                margin: "8px 12px",
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
            gridContainer: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "flex-start",
                "& >div": {
                    minWidth: Number((1000 / column).toFixed()) / 10 + "%",
                },
            },
            notice: {
                marginBottom: theme.spacing(2),
            },
        })
    );

const MarkdownIcon = (props?: any) => {
    return (
        <SvgIcon {...props} viewBox="0 0 1280 1024">
            <path
                d="M1187.7 905.84H92.3C41.4 905.84 0 864.44 0 813.54V210.46c0-50.9 41.4-92.3 92.3-92.3h1095.38c50.9 0 92.3 41.4 92.3 92.3v603.08c0.02 50.9-41.38 92.3-92.28 92.3z m-880-184.6v-240l123.08 153.84 123.08-153.84v240h123.08V302.76h-123.08l-123.08 153.84-123.08-153.84H184.62v418.46h123.08zM1132.3 512h-123.08V302.76h-123.08V512h-123.08l184.62 215.38L1132.3 512z"
                fill=""
                p-id="2049"
            />
        </SvgIcon>
    );
};

const getData = async ({
    page,
    pageSize,
    path,
}: {
    page: number;
    pageSize: number;
    path: string;
}) => {
    const res = await WalineAPI.get("/comment", {
        params: {
            path: path,
            pageSize: pageSize,
            page: page,
        },
    }).catch((err) => {
        throw err;
    });

    return res.data;
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
    const theme = useTheme<Theme>();
    const isPad = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const column = isMobile || isPad ? 1 : 3;
    const classes = useStyles(column)();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

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

    // 后端数据
    const [postData, setData] = useState<CommentListType>({
        count: 5,
        data: [],
        page: 1,
        pageSize: 100,
        totalPages: 1,
    });

    useEffect(() => {
        if (!cookieLoad("ua")) {
            setLoading(true);
            axios
                .post<string>("https://api.ahdark.com/release/user-agent")
                .then((res) => {
                    cookieSave("ua", res.data);
                    setOptions({
                        ...options,
                        ua: res.data,
                    });
                    setLoading(false);
                    setPageLoading(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            setPageLoading(true);
        }
        console.log(
            `Get User-Agent from ${
                cookieLoad("ua") ? "cookie" : "api"
            } success: ${options.ua}`
        );
    }, []);

    // 分页系统
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const nextPage = () => {
        if (page + 1 <= totalPage) {
            setPage(page + 1);
        }
    };
    const previousPage = () => {
        if (page - 1 >= 1) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        getData({
            path: options.url,
            page: page,
            pageSize: 10,
        })
            .then((res) => {
                setData(res);
                setTotalPage(res.totalPages);
            })
            .catch((err) => {
                console.error(err);
                alert(err);
            })
            .then(() => {
                setPageLoading(true);
                console.log(postData);
            });
    }, [options.url, page, loading]);

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

    const submit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!options.comment || options.comment.trim().length < 5) {
            setLoading(false);
            throw Error("评论内容过短");
        }
        if (!options.nick || options.nick.trim().length < 2) {
            setLoading(false);
            throw Error("昵称过短");
        }
        if (
            !options.mail ||
            options.mail.trim().length < 6 ||
            !new RegExp(
                "^[a-zA-Z0-9-_.]+@[a-zA-Z-_0-9]+.[a-zA-Z-_0-9.]+$"
            ).test(options.mail)
        ) {
            setLoading(false);
            throw Error("错误的邮箱");
        }
        WalineAPI.post("/comment", {
            comment: options.comment,
            link: options.link ? options.link : null,
            mail: options.mail,
            nick: options.nick,
            pid: options.pid === 0 ? null : options.pid,
            rid: options.rid === 0 ? null : options.rid,
            ua: options.ua,
            url: options.url,
            at: null,
        })
            .then((res) => {
                if (res.data.errno !== 0) {
                    throw new Error(res.data.errmsg);
                }
            })
            .catch((error) => {
                alert(error);
            })
            .then(() => {
                setLoading(false);
                setOptions({
                    ...options,
                    comment: "",
                });
            });
    };

    let a = [];
    for (let i = 0; i < column; i++) {
        a.push(i);
    }

    if (!pageLoading) {
        return <>{"Loading"}</>;
    }

    return (
        <Box className={classes.root}>
            <Alert severity="info" className={classes.notice}>
                <AlertTitle>注意</AlertTitle>
                本评论系统兼容Markdown语法，请不要大量发表重复内容。
            </Alert>
            <Paper className={classes.editor}>
                <form onSubmit={submit}>
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
                            {inputMeta.map((value) => (
                                <Box
                                    className={classes.infoItem}
                                    key={value.name}
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
                                    disabled={loading}
                                >
                                    {"提交"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Paper>
            {/* 评论列表 */}
            <Grid container={true} className={classes.gridContainer}>
                {a.map((i) => (
                    <Grid item xs={6} key={i}>
                        {postData.data.map((value, index) => {
                            if (index % column === i) {
                                return (
                                    <CommentBlock data={value} key={index} />
                                );
                            } else {
                                return <></>;
                            }
                        })}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
