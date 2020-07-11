import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
import postReducer from "../components/post/postSlice";
import eventReducer from "../components/eventList/eventSlice";
import personalinfoReducer from "../components/PersonalInfoTab/EditPopUp/EditPersonalInfoSlice";
import { useMemo } from "react";
const dev = process.env.NODE_ENV === "development";

let redux: any;

const initStore = (preloadedState: Record<string, unknown>) => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            posts: postReducer,
            events: eventReducer,
            PersonalInfo: personalinfoReducer,
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
