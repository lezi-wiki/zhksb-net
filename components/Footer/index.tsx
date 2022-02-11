import React from "react";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component={"footer"} textAlign={"center"}>
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
                    href={"https://ahdark.com"}
                    fontFamily={'"Noto Sans SC", sans-serif'}
                    underline={"none"}
                    rel={"self noopener"}
                    target={"_blank"}
                >
                    {"AHdark"}
                </Link>
                {" All Right Reserved."}
            </Typography>
        </Box>
    );
}
