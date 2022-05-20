import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { SvgIconComponent } from "@mui/icons-material";

const NavItem: React.FC<{
    path: string;
    name: string;
    icon: SvgIconComponent;
}> = (props) => (
    <Link href={props.path} passHref={true}>
        <ListItemButton>
            <ListItemIcon>
                <props.icon />
            </ListItemIcon>
            <ListItemText primary={props.name} />
        </ListItemButton>
    </Link>
);

export default NavItem;
