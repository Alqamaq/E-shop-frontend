import axios from 'axios'
import {server} from '../../server'


export const createProduct = (newForm)=>async(dispatch)=>{

    try {
        dispatch({type: "ProductCreateReq"});
        const config = {headers:{"Content-Type": "multipart/form-data"}};
        const {data} = await axios.post(`${server}/product/create-product`,newForm,config);
        dispatch({type: "ProductSuccessReq",payload: data.product});

    } catch (error) {
        // make sure we don't crash if response or data is undefined
        const message = error.response?.data?.message || error.message;
        dispatch({type: "ProductCreateFail",payload: message});
    }

}

// Get all products of a shop by its ID

export const getAllProductsShop = (id) => async (dispatch) => {
    try {
        dispatch({ type: "getAllPrductShopReq" });
        const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`);
        dispatch({ type: "getAllPrductShopSuccess", payload: data.products });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: "getAllPrductShopFail", payload: message });
    }
}

// Delete the product of shop

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteProductReq" });
        const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`,{withCredentials: true});
        dispatch({ type: "deleteProductSuccess", payload: data.message });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: "deleteProductFail", payload: message });
    }
}

// Get all products

export const getAllProducts = ()=> async(dispatch)=>{
    try {
        dispatch({ type: "getAllProductReq" });
        const { data } = await axios.get(`${server}/product/get-all-product`);
        dispatch({ type: "getAllProductSuccess", payload: data.products });
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: "getAllProductFail", payload: message });
    }
}


