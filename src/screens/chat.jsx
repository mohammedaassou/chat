import React, { useEffect } from 'react'

import SearchUser from '../components/searchUser';
import { useStateContext } from '../context/context';
import ChatScreen from './components/chatScreen';
import UsersScreen from './components/usersScreen';
import getUsers from '../API/users/getUsers';
import Model from '../components/model';



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
