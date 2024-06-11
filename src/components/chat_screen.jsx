
import React, { useEffect, useRef, useState } from 'react'

import { IoMdArrowBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import getUsers from '../API/users/get_users';
import sendMessage from '../API/message/send';
import messages from '../API/message/massages';
import Message from './message';
import { useStateContext } from '../context/context';
import imageProfile from "../assets/images/image.png"




let navheight = 14;

export default function ChatScreen(){
 
    const {setusers  , selectedUserChat , cureentUser , setcureentUser, CurrentMessages ,setselectedUserChat, setCurrentMessages , isChatScreen , setisChatScreen} = useStateContext();
   
    const [message, setmessage] = useState({text : ""}) 
   
    
     
   
     const send = async() => {
   
       console.log(message.text);
      if(message.text.trim().length <= 0){
        return;
      }
      await sendMessage(message)
   
        setmessage(p=>({  ...p , text : ""}) )
   
       console.log(message)
   
     };

     
   
     const _onBack = ()=>{
        setisChatScreen(false)
     }
     
     const divRef = useRef(null);
   
     useEffect(() => {
      
       if (divRef.current) {
         divRef.current.scrollTop = divRef.current.scrollHeight ;
   
       }

      //  console.log("divRef.current.scrollHeight  "  + divRef.current.scrollHeight)
     }, [CurrentMessages]); 
   
   
   
     useEffect(() => {
       getUsers(setusers , cureentUser);
       
      } , [setusers])
    
      useEffect(()=> {
    
         messages(setCurrentMessages , cureentUser.id , selectedUserChat.id);
    
        setmessage(p=>({...p , userToSentID : selectedUserChat.id , userSentID : cureentUser.id }));
    
      }  , [selectedUserChat ])
      
     
       const style  = isChatScreen ? "block " : "hidden";
     return(
       !selectedUserChat ?  <div className={  !isChatScreen ? " bg-main h-full flex-1 md:flex items-center justify-center  text-white font-bold text-4xl hidden " : "hidden "  }><h1>Your Chat</h1>
        
       </div> :
   
       <div className= {style + " bg-gray-400 h-full flex-1  md:block md:min-[50%] md:max-[50%]"} >
            <nav className={`flex items-center bg-main p-2 py-1 fixed  top-0 left-0 md:left-1/2 right-0  h-${navheight}`}>
                  <IoMdArrowBack onClick={()=> _onBack()} className='block md:hidden'/>
                  {/* test back button */}
                 <div className=' flex  px-2 py-1'>
                 <div className='rounded-full h-10 w-10 bg-white'>
                  <img src={selectedUserChat.imageUrl ?? imageProfile } alt="profile img chat" className='rounded-full w-full h-full'/>
                 </div>
                 <h1 className='text-white ml-2 text-sm'>{selectedUserChat.name}</h1>
                 </div>
            </nav>
           
           {/* print les messages
            */}
            {
             CurrentMessages.length > 0 &&
            <div className={`mt-${navheight} overflow-scroll  h-[100%] p-14 px-4`} ref={divRef}   >
              
             {CurrentMessages.map((msg , index)=> <Message key={index} text={msg.text} userSentID = {msg.userSentID}/> )}
            </div>
            }
              
            <div 
             className='fixed bottom-2 right-0 md:left-1/2 left-0
               flex items-center'>
            <input type='text'  
            placeholder='Type a message'
            className='rounded-full mx-2 flex-1 outline-none text-black px-3 py-2 text-sm' onChange={(e)=> setmessage(p=>({...p , text : e.target.value})) } value={message.text}/>
             <IoSend size={30} className='cursor-pointer text-main' onClick={(e)=> send()}/>
              </div>
       </div>
     )
   }