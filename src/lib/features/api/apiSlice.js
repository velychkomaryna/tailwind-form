import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
    credentials: 'include',
    timeout: 2000,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => 'private/', // Endpoint to fetch user data
      providesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'dj-rest-auth/login/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'dj-rest-auth/logout/',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/dj-rest-auth/token/refresh/',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useLoginUserMutation, useLogoutUserMutation, useRefreshTokenMutation } = apiSlice;
