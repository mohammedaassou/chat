import React from 'react'
import { useStateContext } from '../context/context'

function Message({text , userSentID}) {

   const {cureentUser : {id}}  = useStateContext();
  
 const styleMessage = id === userSentID ? "flex  justify-end text-white" : "flex text-black ";

 const styleMessageP = id == userSentID ? "bg-main" : "bg-white";

  return (
    <div 
    className= { styleMessage } >
       <p className= { styleMessageP +  " text-wrap mt-2 rounded-s p-1 px-2 w-fit" } > {text}</p> 
    </div>
  )
}

export default Message
