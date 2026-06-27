import { createReducer } from "@reduxjs/toolkit";   

const initialState = {
    
    isLoading: true,
}

export const eventReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase("eventCreateReq",(state)=>{
        state.isLoading = true;
    })
    .addCase("eventSuccessReq",(state, action)=>{
        state.isLoading = false;
        state.event = action.payload;
        state.success = true;
    })
    .addCase("eventCreateFail",(state, action)=>{
        
        state.isLoading = false;
        state.error = action.payload;
        state.success= false;
    })
    
    // Get all events of shop

    .addCase('getAllEventShopReq',(state,action)=>{
        state.isLoading = true;
    })
    .addCase('getAllEventShopSuccess',(state,action)=>{
        state.isLoading = false;
        state.events = action.payload;
        
    })
    .addCase('getAllEventShopFail',(state,action)=>{
        state.isLoading = false;
        state.error= action.payload;
        
    })

    // Delete the event of shop
    .addCase('deleteEventReq',(state,action)=>{
        state.isLoading = true;
    })
    .addCase('deleteEventSuccess',(state,action)=>{
        state.isLoading = false;
        state.message = action.payload;
        
    })
    .addCase('deleteEventFail',(state,action)=>{
        state.isLoading = false;
        state.error= action.payload;
        
    })

    // Get all Events
     .addCase('getAllEventReq',(state,action)=>{
        state.isLoading = true;
    })
    .addCase('getAllEventSuccess',(state,action)=>{
        state.isLoading = false;
        state.allEvents = action.payload;
        
    })
    .addCase('getAllEventFail',(state,action)=>{
        state.isLoading = false;
        state.error= action.payload;
        
    })
    
    .addCase("ClearErrors",(state)=>{
        state.error = null;
    })
})