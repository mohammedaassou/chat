import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../API/firebase';
import { signOut } from 'firebase/auth';
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import SearchUser from '../components/searchUser';
import { useStateContext } from '../context/context';
import getUsers from '../API/users/getUsers';
import sendMessage from '../API/message/send';
import messages from '../API/message/massages';
import Message from './components/message';

let navheight = 14;

function Users(){

 const {setopenSearchModel , users , cureentUser, setselectedUserChat , isChatScreen, setisChatScreen , setamisinfo , amisinfo} = useStateContext();

  
  const amis = Array.from(cureentUser.amis ?? []) ;

  useEffect(()=> {
    
    console.log("amis : " , amis);
    
   console.log("users : " , users);



    if(!amis)
      return;
    
    const myFriedns = users.filter((user)=> amis.includes(user.id))

    setamisinfo(myFriedns);

   console.log("generation amis filter");

   console.log("myFriedns : " , myFriedns);




  }
   
   , [cureentUser , users ])
   
   const _onSelectUser = async(e)=>{
    setselectedUserChat(e);
    setisChatScreen(true);
   }
   
  const style = isChatScreen ? "hidden " : "";

  return (
    <div className={  style + 'bg-white h-full flex-1 relative md:max-w-[50%] md:block' }>
            
    <nav className={`p-2 fixed h-14 bg-main top-0 left-0 right-0 md:right-1/2 flex justify-between items-center ${navheight} `}>
      <IoMdSettings className='text-white cursor-pointer ' size={24}/>
      <AiFillPlusCircle className='text-white cursor-pointer ' size={24} onClick={()=> setopenSearchModel(prev=> !prev)}/>
    </nav>

   
   {/* users */}
   <div className={`pt-16 h-[100vh] overflow-scroll`}>
    

    {
      amisinfo.map((e)=> <div key={e.id} className=' flex bg-white px-2 py-2 border-b-[1px] border-main cursor-pointer' onClick={()=> _onSelectUser(e) }>
      <div className='rounded-full h-10 w-10 bg-black'></div>
      <h1 className='text-black ml-2 text-sm'>{e.name}</h1>
      </div>
    
      )
    }


   </div>

</div>
  )
}




function ChatScreen(){
 
 const {setusers  , selectedUserChat , cureentUser , setcureentUser, CurrentMessages ,setselectedUserChat, setCurrentMessages , isChatScreen , setisChatScreen} = useStateContext();

 const [message, setmessage] = useState({text : ""}) 

  useEffect(() => {
   getUsers(setusers , cureentUser);
    
  } , [setusers])

  useEffect(()=> {

     messages(setCurrentMessages , cureentUser.id , selectedUserChat.id);
    
     console.log(CurrentMessages)
    //  console.log(CurrentMessages);

     console.log(cureentUser.id , selectedUserChat.id )

    setmessage(p=>({...p , userToSentID : selectedUserChat.id , userSentID : cureentUser.id }));

  }  , [selectedUserChat ])
  

  

  const send = async() => {

    console.log(message.text);

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
      divRef.current.scrollTop = divRef.current.scrollHeight;

    }
  }, []); 
  
  // isChatScreen ? "hidden" : "block " +
    const style  = isChatScreen ? "block " : "hidden";
  return(
    !selectedUserChat ?  <div className={  isChatScreen ? " bg-gray-400 h-full flex-1 block md:block" : "hidden "  }>test
     
    </div> :

    <div className= {style + " bg-gray-400 h-full flex-1  md:block md:min-[50%] md:max-[50%]"} >
         <nav className={`flex items-center bg-main p-2 py-1 fixed  top-0 left-0 md:left-1/2 right-0  h-${navheight}`}>
               <IoMdArrowBack onClick={()=> _onBack()} className='block md:hidden'/>
               {/* test back button */}
              <div className=' flex  px-2 py-1'>
              <div className='rounded-full h-10 w-10 bg-white'></div>
              <h1 className='text-white ml-2 text-sm'>{selectedUserChat.name}</h1>
              </div>
         </nav>
        
        {/* print les messages
         */}
         {
          CurrentMessages.length > 0 &&
         <div className={`mt-${navheight} overflow-scroll  h-[100%] p-14`} ref={divRef}   >
           
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



function Chat({user}) {



  const {openSearchModel} = useStateContext()



  return (
    <section className='block md:flex h-[100vh] text-white'>
      {
        openSearchModel ? 
        <SearchUser user = {user}/>
        : 
         <Users/>

      }
      <ChatScreen user = {user}/>
          
     
    </section>
  )
}

export default Chat
