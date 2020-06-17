import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import ts from 'typescript/lib/protocol';

interface Comment {
  comment: string;
}

interface Post {
  user: User;
  timeStamp: Date;
  comments: Array<string>;
}

interface User {
  avatarUrl: string;
  profileUrl: string;
}

const initialState: Array<Post> = [
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: [] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: [] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: [] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: [] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: [] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: [] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: ['COMMENT0', 'cOMMENT 2'] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: ['COMMENT1', 'cOMMENT 2'] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: ['COMMENT2', 'cOMMENT 2'] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: ['COMMENT3', 'cOMMENT 2'] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: ['COMMENT4', 'cOMMENT 2'] },
  { user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: ['COMMENT5', 'cOMMENT 2'] },
];

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push({ user: { avatarUrl: 'url1', profileUrl: 'url2' }, timeStamp: new Date(), comments: [] });
    },
    addComment: (state, action: PayloadAction<{ id: number; comment: string }>) => {
      state[action.payload.id].comments.push(action.payload.comment);
    },
  },
});

export const { increment, addComment } = postSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const commentAsync = (id: number): AppThunk => (dispatch, getState) => {
  const { posts } = getState();
  if (posts[id].comments.length === 0) {
    const foaas = 'https://www.foaas.com';
    const urls = [`${foaas}/bday/Jesus/Hell`, `${foaas}/bday/Satan/Heaven`];
    const requests: Promise<string>[] = urls.map((url) => {
      return fetch(url, {
        headers: {
          'Content-Type': 'plain/text',
        },
      }).then((response) => {
        return response.text();
      });
    });
    Promise.all(requests)
      .then((text) => {
        text.forEach((t) => {
          dispatch(addComment({ id: id, comment: t }));
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
