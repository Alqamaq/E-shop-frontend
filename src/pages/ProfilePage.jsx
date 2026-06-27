import React,{useState} from 'react'
import styles from '../styles/styles';
import Header from '../components/Layout/Header';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';


const ProfilePage = ()=>{
    const [active, setActive] = useState(1)
    return(
        <div>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10 w-full`}>
                <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%] ml-[60px]">
                    <ProfileSidebar active={active} setActive={setActive}/>
                    
                </div>
                <ProfileContent active={active} /> 

            </div>
        </div>
    )
}

export default ProfilePage;