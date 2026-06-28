import React from 'react';
import { useState, useEffect } from 'react'
import Header from '../components/Layout/Header.jsx';
import styles from '../styles/styles.js';
import ProductCard from '../components/route/ProductCard.jsx';
import { useSelector } from 'react-redux';


const BestSellingPage = () => {
    const [data, setData] = useState([])
     const { allProducts } = useSelector((state) => state.product)




    useEffect(() => {

       // const d = allProducts && allProducts.sort((a, b) => b.sold_out - a.sold_out);
        setData(allProducts)

    },[allProducts])

    return (
        <div>
            <Header activeHeading={2} />
            <br />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        data.map((item, index) => <ProductCard data={item} key={index} />)
                    }

                </div>

            </div>

        </div>

    )
}

export default BestSellingPage;