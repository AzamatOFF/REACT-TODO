import { configureStore } from '@reduxjs/toolkit';
import RestReducer from './rest.reduce';
import userSlice from './user.slice';

const store = configureStore({
  reducer: {
    RestReducer,
    userSlice
  }
});

export default store;
