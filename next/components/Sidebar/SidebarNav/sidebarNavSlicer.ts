import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../lib/redux";

interface NestedTeamListOpenState {
    map: boolean[];
}

const initialState: NestedTeamListOpenState = { map: [] };

export const nestedTeamListOpenStateSlice = createSlice({
    name: "nestedTeamListOpen",
    initialState,
    reducers: {
        initOpenState: (state, { payload }: PayloadAction<number>) => {
            if (payload > state.map.length) {
                state.map.fill(false, 0, payload);
            }
        },
        setOpenState: (state, { payload: { index, value } }: PayloadAction<{ index: number; value: boolean }>) => {
            state.map[index] = !value;
        },
    },
});

export const { initOpenState, setOpenState } = nestedTeamListOpenStateSlice.actions;

export const selectNestedTeamListOpenState = (state: RootState) => state.nestedTeamListOpen.map;

export default nestedTeamListOpenStateSlice.reducer;
