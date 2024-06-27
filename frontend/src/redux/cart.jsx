import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItem: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
  cartTotalAmount: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (exists !== -1) {
        toast.error("Item already exists in wishlist");
      }else {
        state.cartItem.push({ ...action.payload, qty: 1 });
        localStorage.setItem("wishlist", JSON.stringify(state.cartItem));
        toast.success("Item added to wishlist");
      }
    },
    removeFromCart: (state, action) => {
      const filtered = state.cartItem.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItem = filtered;
      localStorage.setItem('wishlist',JSON.stringify(state.cartItem))
    },
    getTotal: (state, action) => {
      const totalPrice = state.cartItem.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
      );
      state.cartTotalAmount = totalPrice;
    },
    increment: (state, action) => {
      const item = state.cartItem.find(
        (item) => item._id === action.payload._id
      );

      item.qty += 1;
    },
    decrement: (state, action) => {
      const item = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      if (item.qty === 1) {
        return;
      } else {
        item.qty -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, getTotal, increment, decrement } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
