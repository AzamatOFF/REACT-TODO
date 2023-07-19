import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    login: null,
    loaded: false
  },
  reducers: {
    addUser(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.login = action.payload.login;
    },
    removeUser(state) {
      state.name = null;
      state.id = null;
      state.login = null;
    },
    loadTrue(state) {
      state.loaded = true;
    },
    loadFalse(state) {
      state.loaded = false;
    }
  }
});
export default userSlice.reducer;
export const {
  addUser, removeUser, loadTrue, loadFalse
} = userSlice.actions;
