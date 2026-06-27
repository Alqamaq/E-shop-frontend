import axios from 'axios'
import {server} from '../../server'


export const createEvent = (newForm)=>async(dispatch)=>{

    try {
        dispatch({type: "EventCreateReq"});
        const config = {headers:{"Content-Type": "multipart/form-data"}};
        const {data} = await axios.post(`${server}/event/create-event`,newForm,config);
        dispatch({type: "EventSuccessReq",payload: data.event});

    } catch (error) {
        // make sure we don't crash if response or data is undefined
        const message = error.response?.data?.message || error.message;
        dispatch({type: "EventCreateFail",payload: message});
    }

}

// Get all Events of a shop by its ID

export const getAllEventsShop = (id) => async (dispatch) => {
    try {
        dispatch({ type: "getAllEventShopReq" });
        const { data } = await axios.get(`${server}/event/get-all-events-shop/${id}`);
        dispatch({ type: "getAllEventShopSuccess", payload: data.products });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: "getAllEventShopFail", payload: message });
    }
}

// Delete the Event product of shop

export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteEventReq" });
        const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`,{withCredentials: true});
        dispatch({ type: "deleteEventSuccess", payload: data.message });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: "deleteEventFail", payload: message });
    }
}


// Get all Events 

export const getAllEvents = () => async (dispatch) => {
    try {
        dispatch({ type: "getAllEventReq" });
        const { data } = await axios.get(`${server}/event/get-all-events`);
        dispatch({ type: "getAllEventSuccess", payload: data.events });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: "getAllEventFail", payload: message });
    }
}
