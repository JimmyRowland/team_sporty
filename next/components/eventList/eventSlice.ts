import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../lib/redux";

interface Event {
    title: string;
    body: string;
    date: Date;
}

const initialState: Array<Event> = [];

export const EventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvents: (state, action: PayloadAction<Event[]>) => {
            state = state.concat(action.payload);
            return state;
        },
    },
});

export const { addEvents } = EventSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const eventAsync = (): AppThunk => (dispatch, getState) => {
    console.log("event");
    const { events } = getState();
    if (events.length === 0) {
        const url = "https://jsonplaceholder.typicode.com/posts";
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                return json.map((value: any) => {
                    // console.log(value);
                    return {
                        title: value.title,
                        body: value.body,
                        date: new Date(),
                    };
                });
            })
            .then((resEvents) => {
                // console.log(resEvents);
                dispatch(addEvents(resEvents));
            });
    }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectEvents = (state: RootState) => state.events;

export default EventSlice.reducer;
