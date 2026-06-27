import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSidebar';
import AllRefundsOrder from '../../components/Shop/AllRefundsOrder.jsx'



const ShopAllrefunds = () => {
    return (
        <div>
           <DashboardHeader />
           <div  className='flex justify-between w-full'>
               <div className='w-[80px] 800px:w-[330px]'>
                <DashboardSideBar  active={10} />

               </div>
               <div className="w-full flex justify-center ">
                 <AllRefundsOrder />
               </div>

           </div>
        </div>
    )
}

export default ShopAllrefunds;