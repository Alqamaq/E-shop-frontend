import React from 'react';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Layout/Header.jsx';
import Footer from '../components/Layout/Footer.jsx';
import styles from '../styles/styles.js';
import ProductCard from '../components/route/ProductCard.jsx';
import { useSelector } from 'react-redux';


const ProductPage = () => {
    const [data, setData] = useState([])
    const [searchParam] = useSearchParams();
    const categoryData = searchParam.get("category");
    const { allProducts, isLoading } = useSelector((state) => state.product)




    useEffect(() => {
        if (categoryData === null) {
            const d = allProducts
            setData(d)
        } else {
            const d = allProducts && allProducts.filter(item => item.category === categoryData);
            setData(d)
        }
    }, [allProducts])

    return (
        <>
            {
                isLoading ? (
                    null
                ) : (
                    <div>
                        <Header activeHeading={3} />
                        <br />
                        <br />
                        <div className={`${styles.section}`}>
                            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                            </div>
                            {data && data.length === 0 ? (
                                <h1 className="text-center w-full pb-[100px] text-[20px]">
                                    No products Found!
                                </h1>
                            ) : null}
                        </div>
                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default ProductPage;