import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getbaseUrl from '../../../utils/baseURL'; // Ensure base URL is correct

const baseQuery = fetchBaseQuery({
  baseUrl: `${getbaseUrl()}/api/foods`, // Dynamically set the base URL
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const foodsApi = createApi({
  reducerPath: 'foodsApi',
  baseQuery,
  tagTypes: ['Foods'],
  endpoints: (builder) => ({
    fetchAllFoods: builder.query({
      query: () => '/',
      providesTags: ['Foods'],
    }),
    fetchFoodById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error,id ) => [{type: "Foods", id}],
    }),
    AddFood: builder.mutation({
      query: (newFood) => ({
        url: `/create-food`,
        method: "POST",
        body: newFood
      }),
      invalidatesTags: ["Foods"]
    }),
    updateFood: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers:{
          'Content-type': 'application/json'
        }
      }),
      invalidatesTags: ["Foods"]
    }),
    deleteFood: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
    }),
    invalidatesTags: ["Foods"]
    })
  })
})

export const { useFetchAllFoodsQuery, useFetchFoodByIdQuery, useAddFoodMutation, useUpdateFoodMutation, useDeleteFoodMutation } = foodsApi; // Export the hook
export default foodsApi;
