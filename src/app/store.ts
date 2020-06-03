import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
const logger = createLogger({
  // ...options
});
const dev = process.env.NODE_ENV === 'development';
const middleware = dev ? [...getDefaultMiddleware(), thunk, logger] : [...getDefaultMiddleware(), thunk];
export const store = configureStore({
  middleware,
  reducer: {
    counter: counterReducer,
  },
  devTools: dev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
