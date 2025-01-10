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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Decreased ${existingItem.title} quantity to ${existingItem.quantity}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);  // Remove item if quantity is 1
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${existingItem.title} has been removed from your cart.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item._id === id);

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;

        // Notify the user with SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${existingItem.title} quantity updated to ${existingItem.quantity}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    }
  },
});

export const { addtoCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
