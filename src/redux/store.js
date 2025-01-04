import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../redux/features/cart/cartSlice'
import foodsApi from './features/Foods/foodsApi'
import ordersApi from './features/orders/orderApis'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodsApi.middleware, ordersApi.middleware),

})