import { createReducer } from "@reduxjs/toolkit";   

const initialState = {
    
    isLoading: true,
}

export const productReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase("ProductCreateReq",(state)=>{
        state.isLoading = true;
    })
    .addCase("ProductSuccessReq",(state, action)=>{
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    })
    .addCase("ProductCreateFail",(state, action)=>{
        
        state.isLoading = false;
        state.error = action.payload;
        state.success= false;
    })
    
    //get all products of shop

    .addCase('getAllPrductShopReq',(state,action)=>{
        state.isLoading = true;
    })
    .addCase('getAllPrductShopSuccess',(state,action)=>{
        state.isLoading = false;
        state.products = action.payload;
        
    })
    .addCase('getAllPrductShopFail',(state,action)=>{
        state.isLoading = false;
        state.error= action.payload;
        
    })

    // Delet the product of shop
    .addCase('deleteProductReq',(state,action)=>{
        state.isLoading = true;
    })
    .addCase('deleteProductSuccess',(state,action)=>{
        state.isLoading = false;
        state.message = action.payload;
        
    })
    .addCase('deleteProductFail',(state,action)=>{
        state.isLoading = false;
        state.error= action.payload;
        
    })
    // Get all products
    .addCase('getAllProductReq',(state,action)=>{
        state.isLoading = true;
    })
    .addCase('getAllProductSuccess',(state,action)=>{
        state.isLoading = false;
        state.allProducts= action.payload;
        
    })
    .addCase('getAllProductFail',(state,action)=>{
        state.isLoading = false;
        state.error= action.payload;
        
    })

    .addCase("ClearErrors",(state)=>{
        state.error = null;
    })
})