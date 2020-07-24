import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import eventReducer from "../components/eventList/eventSlice";
import selectedUsersInTableReducer from "../components/UserTable/userTableSlice";
import personalinfoReducer from "../components/PersonalInfoTab/EditPopUp/EditPersonalInfoSlice";
import nestedTeamListOpenReducer from "../components/Sidebar/SidebarNav/sidebarNavSlicer";
import teamReducer from "../components/CalendarPage/CalendarPageSlicer";
import { useMemo } from "react";
const dev = process.env.NODE_ENV === "development";

let redux: any;

const initStore = (preloadedState: Record<string, unknown>) => {
    return configureStore({
        reducer: {
            teamNameState: teamReducer,
            events: eventReducer,
            PersonalInfo: personalinfoReducer,
            seletedUserInTable: selectedUsersInTableReducer,
            nestedTeamListOpen: nestedTeamListOpenReducer,
        },
        devTools: dev,
        preloadedState: preloadedState,
    });
};

export const initializeStore = (preloadedState: Record<string, unknown> = {}) => {
    let _store = redux ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (redux) {
        _store = initStore({
            ...redux.getState(),
        });
        // Reset the current store
        redux = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!redux) redux = _store;

    return _store;
};

export function useStore(initialState: Record<string, unknown>) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

export type RootState = ReturnType<typeof redux.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
