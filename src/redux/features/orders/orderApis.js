import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getbaseUrl from '../../../utils/baseURL';

const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getbaseUrl()}/api/orders`,
    credentials: 'include',
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: '',
        method: 'POST',
        body: newOrder,
        credentials: 'include',
      }),
    }),
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ['Orders'],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: '',
      }),
      providesTags: ['Orders'],
    }),
    deleteOrdersByEmail: builder.mutation({
      query: (email) => ({
        url: `/email/${email}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'], // This will refetch all orders after deletion
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useGetAllOrdersQuery,
  useDeleteOrdersByEmailMutation, // This is the delete hook
} = ordersApi;

export default ordersApi;
