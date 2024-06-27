import React from 'react'
import { useStateContext } from '../context/context';
import Profile from './profile';

function Model( ) {

  const {setfriends , setselectedUserChat  , setactiveModel , activeModel , activeProfile ,setactiveProfile , setCurrentMessages} = useStateContext();

  const _onSignOut = async()=> {

    try {


      setfriends([]);

      setselectedUserChat({})
  
      setCurrentMessages([]);
  
      setactiveModel(false);

  
      localStorage.clear();
      
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
    
   
   
  }
  
  return (
   <div>
     <div className='bg-gray-300 text-black w-44 top-10 left-5 p-5 rounded-lg absolute' style={{zIndex : 11}}>
       <ul className='text-sm capitalize'>
         <li className='hover:text-gray-800 transition cursor-pointer'
         onClick={()=>{setactiveProfile(prev=> !prev)}}>Profile</li>
         <li className='hover:text-gray-800 transition cursor-pointer'
          onClick={ _onSignOut}>disconnected</li>
       </ul>
    </div>
    
    {
         activeModel ?
         <div className='absolute bg-gray-900 opacity-60 w-full h-full top-0 right-0 ' 
         style={{zIndex : 10}}
          onClick={()=> {setactiveModel(false); setactiveProfile(false)}}></div> : null
    }

    {
        activeProfile && <Profile/>
    }

        </div>
   
  )
}

export default Model
