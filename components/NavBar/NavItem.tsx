import React from "react";
import { RouteDataItem } from "../../types/RouteDataType";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

export default function NavItem(props: { item: RouteDataItem }) {
    return (
        <Link href={props.item.path} passHref={true}>
            <ListItemButton>
                <ListItemIcon>
                    <props.item.icon />
                </ListItemIcon>
                <ListItemText primary={props.item.name} />
            </ListItemButton>
        </Link>
    );
}
