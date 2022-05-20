import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const hydrateSlice = createSlice({
    name: "hydrate",
    initialState: {} as any,
    reducers: {},
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log("HYDRATE", action.payload);
            return {
                ...state,
                ...action.payload.subject,
            };
        },
    },
});

export default hydrateSlice.reducer;
