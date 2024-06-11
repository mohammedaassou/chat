

import React from 'react'
import { IoBackspaceOutline } from "react-icons/io5";
import { useStateContext } from '../context/context';
import { MdModeEditOutline } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { useState  , useRef} from 'react';
import updateUser from '../API/users/update_user';
import Loading from './loading';
import handleUpload from '../API/doc/upload';
import imageProfile from "../assets/images/image.png"



function Profile() {
 
    const {cureentUser , setactiveProfile , setcureentUser} = useStateContext();
    const [activeEdit, setactiveEdit] = useState(true)
    const [name, setname] = useState(cureentUser.name);
    const [email, setemail] = useState(cureentUser.email);
    const [File, setFile] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [ImageSrc, setImageSrc] = useState(cureentUser.imageUrl);

    const refName = useRef();
    const refEmail = useRef();

    
  
  
    const onEdit = ()=>{
      setactiveEdit(p=>!p);

      refName.current.removeAttribute("readOnly");
      refName.current.removeAttribute("disabled");

      refName.current.focus()

      refEmail.current.removeAttribute("readOnly");
      refEmail.current.removeAttribute("disabled");

    }
   
    const onSave = async ()=>{
      setisLoading(true);

      setactiveEdit(p=>!p);
      
      refName.current.setAttribute("readOnly" , "readOnly");
      refName.current.setAttribute("disabled" , "disabled");

      refEmail.current.setAttribute("readOnly" , "readOnly");
      refEmail.current.setAttribute("disabled" , "disabled")
     
      await updateUser( cureentUser.id , {
        name : name,
        email : email
      } );

      if(File){
        handleUpload(File , null , cureentUser.id).then((url)=> setcureentUser(p=>({...p , imageUrl : url})));
        await updateUser(cureentUser.id , {imageUrl : cureentUser.imageUrl})
      }
         
      


     setTimeout(() => {
      setisLoading(false);
     }, 500);
   
      setcureentUser(prev => ({
        ...prev,
        name: name,
        email: email,
    }));
     
    

      // return null;
    }

    const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file)
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (

 
   <div className='bg-gray-300 text-black  top-[50%] left-[50%] p-10 rounded-lg absolute translate-x-[-50%] translate-y-[-50%] h-screen w-full sm:w-fit sm:h-fit' style={{zIndex : 11}}>
     { isLoading ? <div className=' h-screen sm:h-fit w-full flex justify-center items-center'><Loading/></div>
    :
    <>
    <div className=' flex justify-end'>  <IoBackspaceOutline  className='cursor-pointer ' onClick={()=>setactiveProfile(false) }/></div>
     <div className=' flex justify-center items-center flex-col'>
         <div className='h-20 w-20 bg-black rounded-full text-white relative' >
          <img src={ImageSrc ?? imageProfile} alt="image profile" className = "rounded-full w-full h-full" />
          <input type="file" onChange={handleFileChange}  id='image_profile' className='hidden'  accept="image/*"/>
         {!activeEdit &&
         <label htmlFor="image_profile" className='absolute bottom-[0%] right-[2%] rounded-full bg-gray-300 p-1'><MdModeEditOutline color='black' className = "cursor-pointer"/></label> }  
         </div>

            <div className=' mt-5 text-sm'>
            <div className='mb-2 flex justify-between'><label className='font-semibold'>Username :</label> 
            <input type='text' value={cureentUser.username} name='username'  readOnly disabled className='outline-none p-1 text-xs' />
        </div>


            <div className='mb-2 flex justify-between'><label className='font-semibold'>Name :</label> 
            <input type='text'
             value={name} name='name' activeEdit readOnly disabled className='outline-none p-1 text-xs' ref={ refName} 
            autoComplete='off'
             autoCorrect='off' 
             onChange={(e)=> setname(e.target.value)}/>

            </div>
            
            <div className='mb-2 flex justify-between'><label className='font-semibold'>Email :</label> 
            <input type='email' value={email} name='email' activeEdit readOnly disabled className='outline-none p-1 text-xs' ref={ refEmail} autoComplete='off' autoCorrect='off' onChange={(e)=> setemail(e.target.value)}/>

            </div>

            
            <div className='flex justify-end'>
            {
              activeEdit ? <MdModeEditOutline size={24} className='inline cursor-pointer' onClick={onEdit}/>
               :

              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={onSave}>
              <IoMdSave size={24} className='text-main inline'/>
              <span>Save</span>
              </button>
            }
           
            </div>

         </div>
         
    </div>
    </>
  }
    
        </div>
   
  )
}

export default Profile











