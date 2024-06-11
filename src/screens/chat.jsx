import React, { useEffect } from 'react'

import { useStateContext } from '../context/context';
import ChatScreen from '../components/chat_screen';
import UsersScreen from '../components/users';
import Model from '../components/model';
import SearchUser from '../components/search_user';



function Chat({user}) {

  const {openSearchModel  , setusers , cureentUser , activeModel} = useStateContext()
 
 
  return (
    <section className='block md:flex h-[100vh] text-white'>
      {
        openSearchModel ? 
        <SearchUser user = {user}/>
        : 
         <UsersScreen/>

       
      }
      {
        activeModel&&
        <Model/>
      }

      <ChatScreen user = {user}/>
          
     
    </section>
  )
}

export default Chat
