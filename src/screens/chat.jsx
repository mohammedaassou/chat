import React, { useEffect } from 'react'

import SearchUser from '../components/searchUser';
import { useStateContext } from '../context/context';
import ChatScreen from './components/chatScreen';
import UsersScreen from './components/usersScreen';
import getUsers from '../API/users/getUsers';



function Chat({user}) {

  const {openSearchModel  , setusers , cureentUser , users} = useStateContext()
  
   
 useEffect(() => {
     
  getUsers(setusers  , cureentUser);
  // console.log(users);

}, [setusers])
 
  return (
    <section className='block md:flex h-[100vh] text-white'>
      {
        openSearchModel ? 
        <SearchUser user = {user}/>
        : 
         <UsersScreen/>

      }
      <ChatScreen user = {user}/>
          
     
    </section>
  )
}

export default Chat
