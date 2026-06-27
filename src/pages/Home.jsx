import React from "react"
import Hero from '../components/route/Hero.jsx'
import Header from '../components/Layout/Header.jsx'
import Categories from "../components/route/Categories.jsx"
import BestDeals from "../components/route/BestDeals.jsx"
import Event from '../components/route/Events/Event.jsx'
import FeaturedProduct from "../components/route/FeaturedProduct.jsx"
import Sponsored from "../components/route/Sponsored.jsx"
import Footer from "../components/Layout/Footer.jsx"

const Home = ()=>{
    return(
        <div >
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
            <Event />
            <FeaturedProduct />
            <Sponsored />
            <Footer />
            
          
          
        </div>
    )
}

export default Home;