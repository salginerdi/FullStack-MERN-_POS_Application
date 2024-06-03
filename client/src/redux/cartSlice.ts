import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  _id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  total: number;
  tax: number;
};

const initialState: CartState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cartItems
    : [],
  total: localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")).total
  : 0,
  tax: 20,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    deleteCart: (
      state,
      action: PayloadAction<{ _id: string; quantity: number; price: number }>
    ) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    increase: (state, action: PayloadAction<{ _id: string }>) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (cartItem) {
        cartItem.quantity += 1;
        state.total += cartItem.price;
      }
    },
    decrease: (state, action: PayloadAction<{ _id: string }>) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (cartItem) {
        cartItem.quantity -= 1;
        state.total -= cartItem.price;
        if (cartItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
    },
    reset: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addProduct, deleteCart, increase, decrease, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
