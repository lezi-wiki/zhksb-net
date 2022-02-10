import React from "react";
import { RouteDataItem } from "../../types/RouteDataType";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

export default function NavItem(props: { item: RouteDataItem }) {
    return (
        <Link href={props.item.path} passHref={true}>
            <ListItem button>
                <ListItemIcon>
                    <props.item.icon />
                </ListItemIcon>
                <ListItemText primary={props.item.name} />
            </ListItem>
        </Link>
    );
}
