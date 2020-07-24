import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../lib/redux";

interface EditPersonalInfoState {
    name: string;
    intro: string;
    avatar: string;
    coverimg: string;
}

const initialState: EditPersonalInfoState = {
    name: "Name",
    intro: "Personal intro",
    avatar: "Not yet",
    coverimg: "Not yet",
};

export const editPersonalSlice = createSlice({
    name: "PersonalInfo",
    initialState,
    reducers: {
        changeintro: (state, action: PayloadAction<string>) => {
            state.intro = action.payload;
        },
    },
});

export const { changeintro } = editPersonalSlice.actions;

export const selectPersonal = (state: RootState) => state.PersonalInfo;

export default editPersonalSlice.reducer;
