import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_GW_HOSTNAME,
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
