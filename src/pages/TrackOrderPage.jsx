import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import TrackOrder from "../components/Profile/TrackOrder";
import { useState } from "react";

const TrackOrderPage = ()=>{
    const [active, setActive] = useState(1)
    return(
        <div>
            <Header />
            <TrackOrder />
            <Footer />
        </div>
    )
}

export default TrackOrderPage;