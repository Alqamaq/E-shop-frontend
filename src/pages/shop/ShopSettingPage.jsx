import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar.jsx'
import Footer from '../../components/Layout/Footer'
import ShopSetting from "../../components/Shop/ShopSetting.jsx";

const ShopSettingPage = () => {
   return(
        <div>
           <DashboardHeader />
           <div  className='flex items-center justify-between w-full'>
               <div className='w-[80px] 800px:w-[330px]'>
                <DashboardSideBar  active={11} />

               </div>
               <div className="w-full flex justify-center">
                  <ShopSetting />
               </div>

           </div>
        </div>
    )
}

export default ShopSettingPage;