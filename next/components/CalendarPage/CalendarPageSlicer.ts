import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../lib/redux";

interface teamNameState {
    name: string;
    _id: string;
}

const initialState: { team: teamNameState } = {
    team: {
        name: "All",
        _id: "",
    },
};

export const teamSlice = createSlice({
    name: "teamNameState",
    initialState,
    reducers: {
        setTeam: (state, action: PayloadAction<teamNameState>) => {
            state.team = action.payload;
        },
        resetTeam: (state) => {
            state.team = {
                name: "All",
                _id: "",
            };
        },
    },
});

export const { setTeam, resetTeam } = teamSlice.actions;

export const selectTeamState = (state: RootState) => state.teamNameState.team;

export default teamSlice.reducer;
