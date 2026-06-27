import { createReducer } from "@reduxjs/toolkit";

// Start idle; seller auth check is triggered only on seller-related screens.
const initialState = {
  isSellerAuthenticated: false,
  isLoading: false,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSellerAuthenticated = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFailure", (state, action) => {
      state.isSellerAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("ClearErrors", (state) => {
      state.error = null;
    });
});
