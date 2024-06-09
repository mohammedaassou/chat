

import React, { useEffect} from 'react'

import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { useStateContext } from '../../context/context';
import { signOut } from 'firebase/auth';
import { auth } from '../../API/firebase';
import getFriends from '../../API/users/get_friends';

let navheight = 14;

export default function UsersScreen(){

 const {setopenSearchModel , users , cureentUser, setselectedUserChat , isChatScreen, setisChatScreen , friends , setfriends} = useStateContext();

  console.log(cureentUser);


  useEffect(() => {
     
    getFriends(setfriends , cureentUser.amis);

   
  }, [cureentUser , setfriends])
  
   
   const _onSelectUser = async(e)=>{
    setselectedUserChat(e);
    setisChatScreen(true);
   }
   
   const _onSetting = ()=>{
    signOut(auth);

    setfriends([]);

    setselectedUserChat({})

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
      friends.map((e)=> <div key={e.id} className=' flex bg-white px-2 py-2 border-b-[1px] border-main cursor-pointer' onClick={()=> _onSelectUser(e) }>
      <div className='rounded-full h-10 w-10 bg-black'></div>
      <h1 className='text-black ml-2 text-sm'>{e.name}</h1>
      </div>
    
      )
    }


   </div>

</div>
  )
}
