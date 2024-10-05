import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout } from '@/app/api';

export const loginUser = createAsyncThunk('user/loginUser', login);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    clearUserData(state) {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
})

export const selectUserData = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer
