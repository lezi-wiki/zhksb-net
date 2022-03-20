import React from "react";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component={"footer"} textAlign={"center"} sx={{ margin: 1 }}>
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
                    href={"https://github.com/zhk-sb"}
                    underline={"none"}
                    rel={"self noopener"}
                    target={"_blank"}
                    fontWeight={"bold"}
                >
                    {"ZHKSB Group"}
                </Link>
                {" All Right Reserved."}
            </Typography>
            <Typography variant={"body2"} component={"p"}>
                {"Website built by "}
                <Link
                    href={"https://ahdark.com"}
                    underline={"none"}
                    rel={"author noopener"}
                    target={"_blank"}
                >
                    {"AHdark"}
                </Link>
                {" and served on "}
                <Link
                    href={"https://aws.amazon.com"}
                    underline={"none"}
                    rel={"sponsor noreferrer noopener"}
                    target={"_blank"}
                >
                    {"AWS"}
                </Link>
                {"."}
            </Typography>
        </Box>
    );
}
