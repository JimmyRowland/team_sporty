import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import ts from 'typescript/lib/protocol';
import { addEvents } from '../eventList/eventSlice';

interface Comment {
  comment: string;
}

export interface PostInterface {
  user: User;
  timeStamp: Date;
  comments: Array<string>;
  title: string;
  body: string;
}

interface User {
  id: number;
  avatarUrl: string;
  profileUrl: string;
}

const initialState: Array<PostInterface> = [];

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ id: number; comment: string }>) => {
      state[action.payload.id].comments.push(action.payload.comment);
    },
    loadPosts: (state, action: PayloadAction<Array<PostInterface>>) => {
      state = state.concat(action.payload);
      return state;
    },
  },
});

export const { addComment, loadPosts } = postSlice.actions;

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

export const postAsync = (): AppThunk => (dispatch, getState) => {
  console.log('postAsync');
  const { posts } = getState();
  console.log('postAsync');
  if (posts.length === 0) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.map((value: any) => {
          console.log(value);
          return {
            user: { avatarUrl: '', profileUrl: '', id: value.userId },
            timeStamp: new Date(),
            comments: [],
            title: value.title,
            body: value.body,
          };
        });
      })
      .then((resPosts: Array<PostInterface>) => {
        console.log(resPosts);
        dispatch(loadPosts(resPosts));
      });
  }
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
