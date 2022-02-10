import { OverridableComponent } from "@mui/types";
import { SvgIconTypeMap } from "@mui/material";

export type RouteDataItem = {
    path: string;
    name: string;
    icon: OverridableComponent<SvgIconTypeMap>;
};

export type RouteDataType = Array<RouteDataItem>;
