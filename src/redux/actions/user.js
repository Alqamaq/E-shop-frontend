import axios from 'axios'
import { server } from '../../server.js';

// load user

export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({type: "LoadUserRequest"});
        const {data} = await axios.get(`${server}/user/get-user`, {withCredentials:true})
        dispatch({type: "LoadUserSuccess", payload: data.user})
    } catch (error) {
        dispatch({type: "LoadUserFailure", payload: error.response.data.message})
    }

}

// load Seller
export const loadSeller = ()=>async(dispatch)=>{
    try {
        dispatch({type: "LoadSellerRequest"});
        const {data} = await axios.get(`${server}/shop/get-shop`, {withCredentials:true})
        dispatch({type: "LoadSellerSuccess", payload: data.seller})
    } catch (error) {
        dispatch({type: "LoadSellerFailure", payload: error.response.data.message})
    }

}

// Update User information

export const updateUserInformation = (name,email,password,phoneNumber) => async(dispatch)=>{
    try {
        dispatch({type: 'updateUserInfoRequest'})
        const {data} = await axios.put(`${server}/user/update-user-info`,{name,email,password,phoneNumber},{withCredentials: true})
        dispatch({type: 'updateUserInfoSuccess',payload: data.user})
        
    } catch (error) {
        dispatch({type: 'updateUserInfoFail',payload: error.response.data.message})       
        
    }

}
// Update User Address

export const updateUserAddress = (country,address1,address2,zipCode,addressType) => async(dispatch)=>{
    try {
        dispatch({type: 'updateUserAddressRequest'})
        const {data} = await axios.put(`${server}/user/update-user-address`,{country,address1,address2,zipCode,addressType},{withCredentials: true})
        dispatch({type: 'updateUserAddressSuccess',payload:{updateAddressSuccessMsg:"Updated user address successfully!",user:data.user}})
        
    } catch (error) {
        dispatch({type: 'updateUserAddressFail',payload: error.response.data.message})       
        
    }

}

export const deleteUserAddress= (id)=>async(dispatch)=>{
    try {
        dispatch({type: 'deleteUserAddressRequest'})
        const {data} = await axios.delete(`${server}/user/delete-user-address/${id}`,{withCredentials: true})
        dispatch({type: 'deleteUserAddressSuccess',payload:{successMessage:"Delete user address successfully!",user:data.user}})
        
    } catch (error) {
        dispatch({type: 'deleteUserAddressFail',payload: error.response.data.message})       

        
    }
}