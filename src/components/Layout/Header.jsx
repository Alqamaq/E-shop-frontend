import React, { useState } from 'react';
import styles from '../../styles/styles.js';
import { Link } from 'react-router-dom';
import { productData,categoriesData } from '../../static/data.js'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import DropDown from './DropDown.jsx';
import { BiMenuAltLeft } from 'react-icons/bi';
import Navbar from './Navbar.jsx';
import { useSelector } from 'react-redux';
import { backend_URL } from '../../server.js';
import Cart from '../route/Cart.jsx'
import WishList from '../route/WishList.jsx'



const Header = ({ activeHeading }) => {

    const {cart} = useSelector((state)=> state.cart)
    const {wishList} = useSelector((state)=> state.wishList)
    const { isAuthenticated, user } = useSelector((state) => state.user)
    const {seller} = useSelector((state)=> state.seller)

    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSeacrhData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropdown] = useState(false);
    const [openCart , setOpenCart]= useState(false);
    const [openWishList, setopenWishList] = useState(false)
    


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const fillteredData = productData && productData.filter((product) => {
            return product.name.toLowerCase().includes(value.toLowerCase());
        })

        setSeacrhData(fillteredData);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    })


    return (
        <>
            <div className={`${styles.section}`}>
                <div className="800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <img
                                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Search Box */}
                    <div className='w-[50%] relative'>
                        <input type="text" placeholder='Search Product....' value={searchTerm} onChange={handleSearchChange} className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md" />
                        <AiOutlineSearch size={30} className="absolute right-2 top-1.5 text-[#3957db]" />
                        {
                            searchData && searchData.length > 0 ? (
                                <div className='absolute bg-slate-50 z-10'>
                                    {
                                        searchData && searchData.map((item, index) => {
                                                                                    
                                            return (
                                                <Link to={`/product/${item._id}`} key={index}>
                                                    <div className='w-full flex items-start py-3'>
                                                        <img src={item.image_Url[0].url} className='w-[40px] h-[40px] mr-[10px]' />
                                                        <h1>{item.name}</h1>

                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }

                                </div>
                            ) : null
                        }
                    </div>

                    <div className={`${styles.button}`}>
                        <Link to="/shop-create" className='flex items-center'>
                            <h1 className='text-white flex items-center'>{seller ? 'Dashboard': 'Become Seller'}  <IoIosArrowForward className='ml-1' /> </h1>
                        </Link>

                    </div>


                </div>
            </div>

            {/* second line of Header */}
            <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                } transition 800px:flex items-center justify-between w-full bg-[#3321c8] h-[80px]`}>
                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between mt-4`}>
                    {/*Catogories */}
                    <div >
                        <div className="relative h-[60px] mt-[10px] w-[270px] 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                            <button
                                className={`h-[95%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                            >
                                All Categories
                            </button>
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-4 cursor-pointer"
                                onClick={() => setDropdown(!dropDown)}
                            />
                            {
                                dropDown ? (<DropDown categoriesData={categoriesData} setDropDown={setDropdown} />) : null
                            }
                        </div>
                    </div>

                    {/* NavBar */}
                    <div className={`${styles.noramlFlex} `}>
                        <Navbar active={activeHeading} />

                    </div>

                    <div className='flex space-x-5'>
                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer' onClick={()=> setopenWishList(true)}>
                                <AiOutlineHeart size={30} className="text-white" />
                                <span className='absolute rounded-full right-0 top-0 bg-[#3bc177] w-4 h-4 text-center text-xs text-white font-mono'>{wishList && wishList.length}</span>

                            </div>

                        </div>
                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer mr-12px' onClick={()=> setOpenCart(true)}>
                                <AiOutlineShoppingCart size={30} className="text-white" />
                                <span className='absolute rounded-full right-0 top-0 bg-[#3bc177] w-4 h-4 text-center text-xs text-white font-mono'>{cart && cart.length}</span>

                            </div>

                        </div>
                        <div className={`${styles.noramlFlex}`}>
                            <div className='relative cursor-pointer'>
                                {
                                    isAuthenticated && user && user.avatar && user.avatar.url ? (
                                        <Link to="/profile-user">
                                            <img
                                                src={`${backend_URL}${user.avatar.url}`}
                                                
                                                className='w-10 h-10 rounded-full bg-white'
                                                alt="user-image"
                                            />
                                        </Link>
                                    ) : (
                                        <Link to="/login-user">
                                            <CgProfile size={30} className="text-white" />
                                        </Link>
                                    )
                                }

                            </div>

                        </div>
                        {/* Cart popup */}
                        {
                            openCart ? (<Cart setOpenCart={setOpenCart} />): null
                        }
                        {/* WishList popup */}
                        {
                            openWishList ? (<WishList setopenWishList={setopenWishList} />): null
                        }
                    </div>

                </div>
            </div>

        </>
    )
}

export default Header;