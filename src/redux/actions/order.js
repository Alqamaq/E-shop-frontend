import axios from 'axios'
import {server} from '../../server'

export const AllOrderOfUser =(id)=> async(dispatch)=>{
    try {
        dispatch({type: 'getAllOrderUserReq'})
        const {data}= await axios.get(`${server}/order/get-all-orders/${id}`);
        dispatch({type:'getAllOrderUserSuccess',payload:data.orders})
    } catch (error) {
        const message = error?.response?.data?.message || error.message;
        dispatch({type:'getAllOrderUserFail',payload: message})
        
    }

} 
export const AllOrderOfShop =(shopId)=> async(dispatch)=>{
    try {
        dispatch({type: 'getAllOrderShopReq'})
        const {data}= await axios.get(`${server}/order/get-all-shop-orders/${shopId}`);
        dispatch({type:'getAllOrderShopSuccess',payload:data.orders})
    } catch (error) {
        const message = error?.response?.data?.message || error.message;
        dispatch({type:'getAllOrderShopFail',payload: message})
        
    }

} 