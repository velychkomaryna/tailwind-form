import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: ''
  },
  reducers: {
    setUserData: (state, action) => {
        state.email = action.payload.email;
      },
      clearUserData: (state) => {
        state.email = '';
      },
  },
})

// Action creators are generated for each case reducer function
export const { setUserData, clearUserData } = userSlice.actions

export default userSlice.reducer
