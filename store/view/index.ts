import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ViewType {
    title: string | null;
}

export const initState: ViewType = {
    title: null,
};

const viewSlice = createSlice({
    name: "view",
    initialState: initState,
    reducers: {
        setTitle(state, action: PayloadAction<string | null>) {
            state.title = action.payload;
        },
    },
});

export const { setTitle } = viewSlice.actions;
export default viewSlice.reducer;
