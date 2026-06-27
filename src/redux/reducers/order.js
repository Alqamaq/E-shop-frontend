import { createReducer } from "@reduxjs/toolkit";   

const initialState = {
    
    isLoading: true,
}
//get all ordeer of user
export const orderReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase('getAllOrderUserReq',(state)=>{
        state.isLoading= true;

    })
    .addCase('getAllOrderUserSuccess',(state,action)=>{
        state.isLoading= true;
        state.orders = action.payload;

    })
    .addCase('getAllOrderUserFail',(state,action)=>{
        state.isLoading= false;
        state.error = action.payload;

    })
     //get all ordeer of shop
    .addCase('getAllOrderShopReq',(state,action)=>{
        state.isLoading = true;
    })
    .addCase('getAllOrderShopSuccess',(state,action)=>{
        state.isLoading = false;
        state.orders= action.payload;
        
    })
    .addCase('getAllOrderShopFail',(state,action)=>{
        state.isLoading = false;
        state.error= action.payload;
        
    })

    .addCase('clearErrors',(state)=>{
        state.error = null;
    })
})