import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../lib/redux";

interface SeletedUserState {
    selectedUsers: string[];
}

const initialState: SeletedUserState = {
    selectedUsers: [],
};

export const userTableSlice = createSlice({
    name: "seletedUserInTable",
    initialState,
    reducers: {
        setSeletedUsers: (state, action: PayloadAction<string[]>) => {
            state.selectedUsers = action.payload;
        },
    },
});

export const { setSeletedUsers } = userTableSlice.actions;

export const selectSeletedUserState = (state: RootState) => state.seletedUserInTable.selectedUsers;

export default userTableSlice.reducer;
