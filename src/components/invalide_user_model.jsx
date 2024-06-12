import React from 'react'
import { useStateContext } from '../context/context'

function InvalideUserModel() {
  
    const {setisInvalideUser} = useStateContext()
  return (
    <div >
        <div className='bg-gray-800 opacity-70 text-black  absolute h-screen w-full' style={{zIndex : 100}}> </div>

       <div className='text-sm  bg-gray-300 rounded-sm w-52 h-32 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' style={{zIndex : 101}}>
           <p className='text-center p-5'>Invalide data</p>
           <button className='absolute bottom-5 right-5 bg-gray-800 p-2 rounded-md text-white' onClick={()=>setisInvalideUser(false) }>Try again</button>
       </div>
      
    </div>
  )
}

export default InvalideUserModel
