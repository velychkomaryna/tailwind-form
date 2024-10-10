"use client"

import { isRejectedWithValue } from '@reduxjs/toolkit';

import { apiSlice } from '@/lib/features/api/apiSlice'
import { configureStore } from '@reduxjs/toolkit';

export const unauthorizedMiddleware = (storeAPI) => (next) => async (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload?.status === 401) {
        const refreshResult = await storeAPI.dispatch(apiSlice.endpoints.refreshToken.initiate()); // Cannot use hook, refresh token

        if (refreshResult?.error) {
          console.error('Error:', refreshResult.error);
          window.location.href = '/login';
        }
      }
    }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, unauthorizedMiddleware),
});
