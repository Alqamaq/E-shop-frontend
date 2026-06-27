import { createReducer } from "@reduxjs/toolkit";   

// begin assuming the authentication check is ongoing – keeps routes stable until response
const initialState = {
    isAuthenticated: false,
    loading: true,
}

export const userReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase("LoadUserRequest",(state)=>{
        state.loading = true;
    })
    .addCase("LoadUserSuccess",(state, action)=>{
        state.isAuthenticated= true;
        state.loading = false;
        state.user = action.payload;
    })
    .addCase("LoadUserFailure",(state, action)=>{
        state.isAuthenticated= false;
        state.loading = false;
        state.error = action.payload;
    })


    //update user information 
    .addCase('updateUserInfoRequest',(state)=>{
        state.loading = true;
    })
    .addCase('updateUserInfoSuccess',(state,action)=>{
        state.loading = false;
        state.user= action.payload;
    })
    .addCase('updateUserInfoFail',(state,action)=>{
        state.loading = false;
        state.error= action.payload;
    })

    //update user Address
    .addCase('updateUserAddressRequest',(state)=>{
        state.addressloading = true;
    })
    .addCase('updateUserAddressSuccess',(state,action)=>{
        state.addressloading = false;
        state.updateAddressSuccessMsg=action.payload.updateAddressSuccessMsg
        state.user= action.payload.user;
    })
    .addCase('updateUserAddressFail',(state,action)=>{
        state.addressloading = false;
        state.error= action.payload;
    })

    // Delete user Address
    .addCase('deleteUserAddressRequest',(state,action)=>{
        state.addressloading = true;
    })
    .addCase('deleteUserAddressSuccess',(state,action)=>{
        state.addressloading = false;
        state.successMessage= action.payload.successMessage;
        state.user= action.payload.user;
    })
    .addCase('deleteUserAddressFail',(state,action)=>{
        state.addressloading = false;
        state.error = action.payload
    })



    .addCase("ClearErrors",(state)=>{
        state.error = null;
    })
})
