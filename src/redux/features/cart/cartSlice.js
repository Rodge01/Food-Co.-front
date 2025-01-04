import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
    
      if (existingItem) {
        // Increment the quantity if the item already exists
        existingItem.quantity += 1;
    
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Increased ${existingItem.title} quantity to ${existingItem.quantity}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
    
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product Added',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
    
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;  // Decrease quantity
        } else {
          state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);  // Remove item if quantity is 1
        }
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    }
  },
});

export const { addtoCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
