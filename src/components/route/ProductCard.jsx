import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/styles'
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineEye } from 'react-icons/ai';
import ProductDetailsCard from './ProductDetailsCard';
import { backend_URL } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cart';
import { toast } from 'react-toastify'
import { addToWishList, removeFromWishList } from '../../redux/actions/wishList';

const ProductCard = ({ data }) => {

    const { cart } = useSelector((state) => state.cart)
    const { wishList } = useSelector((state) => state.wishList)

    const dispatch = useDispatch()

    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)

    const productName = (data?.name ?? 'product').replace(/\s/g, '-').toLowerCase();
    const imageUrl = data?.images?.[1].public_id ?? ''
    // console.log(imageUrl)
    const shopName = data?.shop?.name ?? ''
    const price = data?.discountPrice ?? data?.originalPrice ?? 0
    const regularPrice = data?.originalPrice ?? 0
    const sold = data?.sold_out ?? data?.total_sell ?? 0

    //console.log(data)

    const addToWishListHandler = (data) => {
        setClick(!click)
        dispatch(addToWishList(data))
    }

    const removeFromWishListHandler = (data) => {
        setClick(!click)
        dispatch(removeFromWishList(data))
    }

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addToCart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };

    useEffect(() => {
        if (wishList && wishList.find((i) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishList,data._id]);

    return (
        <>
            <div className='w-full bg-white h-[370px] shadow-lg relative rounded-md p-3 cursor-pointer'>
                <div className='flex justify-end'></div>

                <Link to={`/product/${data._id}`}>
                    <img src={`${backend_URL}${imageUrl}`} alt={data?.name} className='w-full h-[170px] object-contain' />
                </Link>
                <Link to='/'>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>
                <Link to={`/product/${data._id}`}>
                    <h4 className='pb-3 font-[500]'>
                        {(data?.name || '').length > 40 ? (data.name.slice(0, 40) + '...') : data?.name}
                    </h4>
                </Link>

                <div className='flex'>
                    <AiFillStar className='mr-2 cursor-pointer ' color='#F6BA00' size={20} />
                    <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                    <AiFillStar className='mr-2 cursor-pointer ' color='#F6BA00' size={20} />
                    <AiFillStar className='mr-2 cursor-pointer ' color='#F6BA00' size={20} />
                    <AiOutlineStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
                </div>

                <div className="flex items-center justify-between py-2">
                    <div className='flex'>
                        <h5 className={`${styles.productDiscountPrice}`}>
                            {data.discountPrice ? data.discountPrice + '$' : null}
                        </h5>
                        <h4 className={`${styles.price}`}>
                            {data.originalPrice}$

                        </h4>

                    </div>
                    <span className="font-400 text-[17px] text-[#68d284]">{data.sold_out} sold</span>
                </div>

                <div>
                    {
                        click ? (
                            <AiFillHeart
                                className='cursor-pointer absolute top-5 right-2'
                                size={22}
                                color={click ? "red" : '#333'}
                                onClick={() => removeFromWishListHandler(data)}
                                title="Remove from wishlist"
                            />
                        ) : (
                            <AiOutlineHeart
                                className='cursor-pointer absolute top-5 right-2'
                                size={22}
                                color={click ? "red" : "#333"}
                                onClick={() => addToWishListHandler(data)}
                                title="Add to wishlist"
                            />)
                    }
                    <AiOutlineEye
                        className='cursor-pointer absolute top-14 right-2 '

                        size={22}
                        onClick={() => setOpen(!open)}
                        title='Quick View'
                    />
                    <AiOutlineShoppingCart
                        onClick={() => addToCartHandler(data._id)}
                        className='cursor-pointer absolute top-24 right-2'
                        size={22}
                        color="#444"
                        title="Add to cart"
                    />

                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>


            </div>
        </>
    )
}

export default ProductCard;