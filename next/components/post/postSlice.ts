import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import ts from "typescript/lib/protocol";
import { addEvents } from "../eventList/eventSlice";
import { gql } from "apollo-boost";
import ApolloClient from "apollo-boost";
import ObjectId from "mongo";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
});

const MESSAGE_LIST = gql`
    {
        messages {
            _id
            content
            user
            isPined
            creationDate
        }
    }
`;

interface Comment {
    comment: string;
}

export interface PostInterface {
    id: string;
    user: User;
    timeStamp: Date;
    comments: Array<string>;
    title: string;
    body: string;
    pin: boolean;
}

interface User {
    id: number;
    avatarUrl: string;
    profileUrl: string;
}

const initialState: Array<PostInterface> = [
    // { user: { id: 10, avatarUrl: '', profileUrl: '' }, timeStamp: new Date(), comments: [], title: '', body: '' },
];

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<{ id: number; comment: string }>) => {
            state[action.payload.id].comments.push(action.payload.comment);
        },
        loadPosts: (state, action: PayloadAction<Array<PostInterface>>) => {
            state = action.payload;
            return state;
        },
        addPost: (state, action: PayloadAction<PostInterface>) => {
            state.push(action.payload);
        },
        changePin: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.map((post: any) => {
                if (post.id === action.payload.id) {
                    post.pin = action.payload.pin;
                }
            });
        },
    },
});

export const { addComment, loadPosts, addPost, changePin } = postSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const addpostAsync = (content: string, user: string): AppThunk => (dispatch) => {
    const ADD_MESSAGE = gql`
    mutation {
        postMessage(content:"${content}", user:"${user}", isPined: false) {
            message {
                _id
                content
                user
                isPined
                creationDate
            }
        }
    }
`;

    console.log(ADD_MESSAGE);
    client
        .mutate({ mutation: ADD_MESSAGE })
        .then((result) => {
            return result.data.postMessage.message;
        })
        .then((value) => {
            console.log(value);
            return {
                id: value._id,
                user: { avatarUrl: "", profileUrl: "", id: "" },
                timeStamp: value.creationDate,
                comments: [],
                title: value.user,
                body: value.content,
                pin: false,
            };
        })
        .then((resPost: PostInterface) => {
            console.log(resPost);
            dispatch(addPost(resPost));
        });
};
export const postAsync = (): AppThunk => (dispatch, getState) => {
    client
        .query({ query: MESSAGE_LIST })
        .then((result) => {
            return result.data.messages;
        })
        .then((json) => {
            return json.map((value: any) => {
                return {
                    id: value._id,
                    user: { avatarUrl: "", profileUrl: "", id: "" },
                    timeStamp: value.creationDate,
                    comments: [],
                    title: value.user,
                    body: value.content,
                    pin: false,
                };
            });
        })
        .then((resPosts: Array<PostInterface>) => {
            console.log(resPosts);
            dispatch(loadPosts(resPosts));
        });
};

export const changePinAsync = (id: string, pin: boolean): AppThunk => (dispatch) => {
    const UPDATE_PIN = gql`mutation {
        updateMessagePin(
            _id:"${id}"
            isPined:${pin}
        )}`;
    client.mutate({ mutation: UPDATE_PIN }).then((result) => {
        console.log(result);
        dispatch(changePin({ id, pin }));
    });
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
