import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PostInterface } from './postSlice';

const initialState: Array<PostInterface> = [];

export const pinnedPostSlice = createSlice({
  name: 'pinnedpost',
  initialState,
  reducers: {
    addPin: (state, action: PayloadAction<PostInterface>) => {
      const newpost = {
        id: action.payload.id,
        user: {
          avatarUrl: action.payload.user.avatarUrl,
          profileUrl: action.payload.user.profileUrl,
          id: action.payload.user.id,
        },
        timeStamp: action.payload.timeStamp,
        comments: action.payload.comments,
        title: action.payload.title,
        body: action.payload.body,
        pin: true,
      };
      const newstate = state.filter((post) => post.id !== newpost.id);
      newstate.push(newpost);
      return newstate;
    },
    removePin: (state, action: PayloadAction<number>) => {
      const postid = action.payload;
      return state.filter((post) => post.id !== postid);
    },
  },
});

export const { addPin, removePin } = pinnedPostSlice.actions;

export const selectPinnedPosts = (state: RootState) => state.pinnedposts;

export default pinnedPostSlice.reducer;
