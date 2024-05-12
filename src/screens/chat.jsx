import React from 'react'
import { auth } from '../API/firebase';
import { signOut } from 'firebase/auth';

function Chat() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <section className='block sm:flex h-[100vh] text-white'>
      <div className='bg-red-900 h-full flex-1'>
        <div className='bg-white flex  p-2'>
          <div className='rounded-full h-10 w-10 bg-black'></div>
          <h1 className='text-black ml-2'>Mohamed Aassou</h1>
        </div>
      </div>

      <div className='bg-green-950 h-full flex-1'>
        cureentChat
      </div>
    </section>
  )
}

export default Chat
