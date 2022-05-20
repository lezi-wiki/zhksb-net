import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import view from "./view";
import hydrate from "./hydrate";
import commentInfo from "../service/CommentInfo";
import thunk from "redux-thunk";

const store = () =>
    configureStore({
        reducer: {
            hydrate,
            view,
            [commentInfo.reducerPath]: commentInfo.reducer,
        },
        devTools: process.env.NODE_ENV === "development",
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(thunk).concat(commentInfo.middleware),
    });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(store);
