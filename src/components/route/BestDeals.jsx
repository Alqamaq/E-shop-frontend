import React, { useState, useEffect } from 'react';
import styles from '../../styles/styles.js';
import ProductCard from './ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';


const BestDeals = () => {

    const [data, setData] = useState([])
    const { allProducts } = useSelector((state) => state.product)
    //console.log(allProducts)
    

    useEffect(() => {
        if (!allProducts?.length) return

        // Sort by the best-selling metric (backend uses sold_out)
        const sortedData = [...allProducts].sort((a, b) => (b.sold_out || b.total_sell || 0) - (a.sold_out || a.total_sell || 0))
        const firstSix = sortedData.slice(0, 6)
        setData(firstSix)

    }, [allProducts])

    

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Best Deals</h1>
                </div>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                    {
                        data && data.length !== 0 && (
                            <>
                                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                            </>
                        )
                    }
                </div>
            </div>
        </div>

    )

}

export default BestDeals;
