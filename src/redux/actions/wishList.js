// add to item to WishList
export const addToWishList =(data) =>async(dispatch, getState)=>{
    dispatch({
        type: 'addToWishList',
        payload: data,
    })

    localStorage.setItem('wishListItem',JSON.stringify(getState().wishList.wishList))
    return data

}

// Remove item from WishList

export const removeFromWishList = (data)=>async(dispatch,getState)=>{
    dispatch({
        type:'removeFromWishList',
        payload: data._id,
    })

    localStorage.removeItem('wishListItem',JSON.stringify(getState().wishList.wishList))
    return data;
}