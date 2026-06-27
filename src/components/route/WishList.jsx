import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCartPlus } from 'react-icons/bs'
import styles from '../../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { backend_URL } from '../../server';
import { addToCart } from '../../redux/actions/cart';
import { removeFromWishList } from '../../redux/actions/wishList';

const WishList = ({ setopenWishList }) => {

    const { wishList } = useSelector((state) => state.wishList)

    const dispatch = useDispatch();

    const addToCartHandler= (data)=>{
        const newData= {...data,qty: 1};
        dispatch(addToCart(newData));
        setopenWishList(false)

    }

    const removeFromWishlistHandler= (data)=>{
        dispatch(removeFromWishList(data))

    }





    return (
        <div className='fixed left-0 top-0 w-full h-screen bg-[#0000004b] z-10'>
            <div className='fixed top-0 right-0 w-[25%] min-h-full bg-white flex flex-col justify-between shadow-sm'>
                {wishList && wishList.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                            <RxCross1
                                size={25}
                                className="cursor-pointer"
                                onClick={() => setopenWishList(false)}
                            />
                        </div>
                        <h5>Wishlist Items is empty!</h5>
                    </div>
                ) : (
                    <>
                        <div>
                            <div className="flex w-full justify-end pt-5 pr-5">
                                <RxCross1
                                    size={25}
                                    className="cursor-pointer"
                                    onClick={() => setopenWishList(false)}
                                />
                            </div>
                            {/* Item length */}
                            <div className={`${styles.noramlFlex} p-4`}>
                                <AiOutlineHeart size={25} />
                                <h5 className="pl-2 text-[20px] font-[500]">
                                    {wishList && wishList.length} items
                                </h5>
                            </div>

                            {/* cart Single Items */}
                            <br />
                            <div className="w-full border-t">
                                {wishList &&
                                    wishList.map((i, index) => (
                                        <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>

    )
}

const CartSingle = ({ data ,removeFromWishlistHandler,addToCartHandler}) => {

    const [value, setValue] = useState(1);
    const totalPrice = data.discountPrice * value;
    const imageUrl = data?.images?.[1].public_id ?? ''

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center" >
                <RxCross1 size={40} className='cursor-pointer'  onClick={()=> removeFromWishlistHandler(data)}/>
                <img src={`${backend_URL}${imageUrl}`} alt=""
                    className='w-[80px] h-[80px] ml-2' />


                <div className='pl-5px'>
                    <h1>{data.name}</h1>

                    <h4 className='font-[600] text-[17px] text-[#d02222] font-Roboto'>
                        US${totalPrice}
                    </h4>

                </div>
                <BsCartPlus size={40} className='cursor-pointer' title='Add to Cart' onClick={()=> addToCartHandler(data)}  />
            </div>

        </div>

    )
}

export default WishList;