import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import styles from '../../styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { backend_URL } from '../../server';
import { addToCart } from '../../redux/actions/cart';
import { removeFromCart } from '../../redux/actions/cart';
import {toast } from 'react-toastify'

const Cart = ({ setOpenCart }) => {

    const { cart } = useSelector((state) => state.cart)
    const dispatch= useDispatch()

    //console.log(cart)

    const toatalPrices = cart.reduce(
        (total,item)=> (total + (item.discountPrice * item.qty)
    ),0)


   

    const quantityChangeHandler=(data)=>{
        dispatch(addToCart(data))
    }

    const removeItemFromCart= (data)=>{
        dispatch(removeFromCart(data))
    }

    return (
        <div className='fixed left-0 top-0 w-full h-screen bg-[#0000004b] z-10'>
            <div className='fixed top-0 right-0 w-[25%] min-h-full bg-white flex flex-col justify-between shadow-sm'>
                {cart && cart.length === 0 ?
                    (
                        <div className="w-full h-screen flex items-center justify-center">
                            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                                <RxCross1
                                    size={25}
                                    className="cursor-pointer"
                                    onClick={() => setOpenCart(false)}
                                />
                            </div>
                            <h5>Cart Items is empty!</h5>
                        </div>
                    ) : (
                        <>
                            <div>
                                <div className='w-full flex justify-end pt-5 pr-5'>
                                    <RxCross1
                                        size={25}
                                        className="cursor-pointer"
                                        onClick={() => setOpenCart(false)}
                                    />
                                </div>
                                {/* items length */}
                                <div className={`${styles.noramlFlex} p-4`}>
                                    <IoBagHandleOutline size={25} />
                                    <h5 className='pl-2 text-[20px] font-[500]'>
                                        {cart && cart.length} items
                                    </h5>

                                </div>
                                {/* Cart Sigle Items */}
                                <br />
                                <div className='w-full border-t'>
                                    {
                                        cart && cart.map((item, index) => (
                                            <CartSingle key={index} data={item} 
                                            quantityChangeHandler={quantityChangeHandler}
                                            removeItemFromCart={removeItemFromCart}

                                            />

                                        ))
                                    }


                                </div>

                            </div>
                            <div className='px-5 mb-3'>
                                {/* Checkout Button */}
                                <Link to='/checkout'>
                                    <div className={`h-[45px] flex items-center justify-center w-[100%] rounded-[5px] bg-[#e44343]`}>
                                        <h1 className='text-[#fff] text-[18px] font-[600]'>Checkout Now (USD${`${toatalPrices}`})</h1>

                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
            </div>


        </div>

    )
}

const CartSingle = ({ data,quantityChangeHandler,removeItemFromCart }) => {

    const [value, setValue] = useState(data.qty);
    const totalPrice = data.discountPrice * value;
    const imageUrl = data?.images?.[1].public_id ?? ''

    const increment= (data)=>{
        if(data.stock < value){
            toast.error("Limited stock")
        }else{
            setValue(value+1)
            const updateCartData = {...data, qty:value+1}
            quantityChangeHandler(updateCartData)
        }
    }
    const decrement = (data)=>{
        setValue(value === 1 ? 1: value-1)
        const updateCartData = {...data,qty: value === 1 ? 1: value-1}
       
        quantityChangeHandler(updateCartData)
        
    }
    
    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <div>
                    <div onClick={()=> increment(data)} className={`bg-[#e44343] border border-[#e443473] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}>
                        <HiPlus size={15} color='#fff' />
                    </div>
                    <span className='pl-[10px]'>
                        {value}

                    </span>
                    <div onClick={() => decrement(data)} className={`bg-[#a7abb14f] flex items-center justify-center rounded-full h-[25px] w-[25px] cursor-pointer`}>
                        <HiOutlineMinus size={16} color='#fff' />

                    </div>
                </div>

                <img src={`${backend_URL}${imageUrl}`} alt=""
                    className='w-[80px] h-[80px] ml-2' />
                <div className='pl-5px'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#0000082]'>${data.discountPrice} * {value}</h4>
                    <h4 className='font-[600] text-[17px] text-[#d02222] font-Roboto'>
                        US$ {totalPrice}
                    </h4>

                </div>
                <RxCross1 size={15} className='cursor-pointer' onClick={()=> removeItemFromCart(data)} />
            </div>
        </div>

    )
}

export default Cart;