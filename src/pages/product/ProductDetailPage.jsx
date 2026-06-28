import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import ProductDetail from "../../components/Product/ProductDetail.jsx";
import SuggestedProduct from "../../components/Product/SuggestedProduct.jsx";             
import { useSelector } from "react-redux";


const ProductDetailPage = () => {
    
    const {allProducts} = useSelector((state)=> state.product)
    const {allEvents} = useSelector((state)=> state.event)
    const [data, setData] = useState(null)
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const eventData = searchParams.get('isEvent')
 
    useEffect(() => {
      if(eventData!=null){
        const data= allEvents && allEvents.find((i)=> i._id=== id)
        setData(data)

      }else{
          const {data}= allProducts&& allProducts.find((i)=> i._id=== id)
          setData(data)
      }   
    }, allEvents,allProducts,eventData,id)

    return (
        <div>
            <Header />
            <ProductDetail data={data}/>
            {
                data && <SuggestedProduct data={data}/>
            }
            <Footer />
        </div>
    )
}
export default ProductDetailPage;