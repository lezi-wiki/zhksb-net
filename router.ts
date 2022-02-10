import HomeIcon from "@mui/icons-material/Home";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import { RouteDataType } from "./types/RouteDataType";

export const RouteData: RouteDataType = [
    {
        path: "/",
        name: "Home",
        icon: HomeIcon,
    },
    {
        path: "/comment",
        name: "Comment",
        icon: TextsmsRoundedIcon,
    },
];
