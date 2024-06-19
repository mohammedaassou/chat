

import React, { useEffect, useState} from 'react'
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { useStateContext } from '../context/context';
import getFriends from '../API/users/get_friends';
import getUsers from '../API/users/get_users';
import Loading from './loading';
import imageProfile from "../assets/images/image.png"
import { signOut } from 'firebase/auth';
import { auth } from '../API/firebase';

let navheight = 14;

export default function UsersScreen(){

 const {setopenSearchModel , users , setactiveModel, setusers, cureentUser, setselectedUserChat , isChatScreen, setisChatScreen , friends , setfriends} = useStateContext();

  
  const [isLoading, setisLoading] = useState(false)
   
  useEffect(() => {
      
   const subscribe = async()=>{
     await getUsers(setusers  , cureentUser);
 
   } 
   subscribe();


 }, [])


  useEffect(() => {

    // signOut(auth)


    let unsubscribe;

    const fetchFriends = async () => {
      unsubscribe = await getFriends(setfriends, cureentUser.amis);
      console.log("frinds => " , friends)
    };

    fetchFriends();

    
  }, [cureentUser]);
  
   
   const _onSelectUser = async(e)=>{
    setselectedUserChat(e);
    setisChatScreen(true);
   }
   
   const _onSetting = ()=>{
    setactiveModel(prev =>!prev)

   }
  const style = isChatScreen ? "hidden " : "";

  return (
    <div className={  style + 'bg-white h-full flex-1 relative md:max-w-[50%] md:block' }>
            
    <nav className={`p-2 fixed h-14 bg-main top-0 left-0 right-0 md:right-1/2 flex justify-between items-center ${navheight} `}>
      <IoMdSettings className='text-white cursor-pointer ' size={24} onClick={_onSetting}/>
      <AiFillPlusCircle className='text-white cursor-pointer ' size={24} onClick={()=> setopenSearchModel(prev=> !prev)}/>
    </nav>

   
   {/* users */}
   <div className={`pt-16 h-[100vh] overflow-scroll`}>
      
   
    {
      isLoading ? <Loading/> :
      friends.map((e)=> <div key={e.id} className=' flex bg-white px-2 py-2 border-b-[0.1px] border-gray-500 cursor-pointer' onClick={()=> _onSelectUser(e) }>
      <div className='rounded-full h-10 w-10 bg-black'>
        <img src= {e.imageUrl ?? imageProfile }alt="profile img" className = "rounded-full w-full h-full" />
      </div>
      <h1 className='text-black ml-2 text-sm'>{e.name}</h1>
      </div>
    
      )
    }


   </div>

</div>
  )
}
