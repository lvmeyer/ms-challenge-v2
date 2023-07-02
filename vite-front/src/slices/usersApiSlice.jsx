import { apiSlice } from './apiSlice';

const AUTH_URL = '/api/v1/auth';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
        withCredentials: true,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
