


import React , {useState} from 'react'
import { useStateContext } from '../context/context';
import { IoMdPersonAdd , IoMdArrowBack} from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";
import updateUser from '../API/users/update_user';
import imageProfile from "../assets/images/image.png"


function SearchUser() {
  
   const {users , cureentUser , setcureentUser , friends , setfriends} = useStateContext();

   const [serchedliste, setserchedliste] = useState([])

  
 const [searchName, setsearchName] = useState("")
  


  const _onSeach = (e)=>{
    setsearchName(e.target.value);

    if(e.target.value === ""){
      setserchedliste([]);
      return ;
    }
    
    const amis = Array.from(cureentUser.amis?? []);

    console.log("amis :  " , amis);

    const liste = users.filter((e)=> e.name.toLowerCase().startsWith(searchName.toLowerCase()) && !amis.includes(e.uid) )
     
    setserchedliste(liste);
     
    
  }
  
 const _onAddUser = (e)=>{
  
  // uids of friends is in array amis
  const amis = Array.from(cureentUser.amis ?? []);
   
  if(!amis) return;

  if(cureentUser.id && e.uid && !amis.includes(e.uid)){
    updateUser(cureentUser.id , {
      amis : [...amis , e.uid]
    });
  
    updateUser(e.id , {
      amis : [...e.amis ?? [] , cureentUser.uid]
    });

    setcureentUser(prev=> ({ ...prev , amis : [...amis , e.uid]}));
    
    setfriends([...friends , e]);
    
    console.log(cureentUser.amis);

    
    const liste = serchedliste.filter((elem)=> elem.id != e.id)
    
    setserchedliste(liste)
     
     
  }

  else console.log("amis alredy has")

 }




  
 const {setopenSearchModel} = useStateContext()

  
  return (
    <div className='flex-1 h-screen overflow-scroll' 
    style={{boxShadow : "0px 0px 5px 1px gray"}}>



<form className="flex items-center p-4 mx-auto fixed top-0 right-0 left-0 bg-white md:right-1/2">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <button  type='button' className="text-xl text-black mr-2" 
    onClick={()=> setopenSearchModel(prev=>!prev)}
  >
      <IoMdArrowBack/>
    </button>

    <div className="relative w-full">
      
        <input type='text' id="simple-search" 
        className="bg-gray-50 border
         border-gray-300 text-gray-900 
         text-sm rounded-lg focus:ring-blue-500
          focus:border-blue-500 block w-full 
          ps-10 p-2.5  dark:bg-gray-700
           dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
             placeholder="Search branch name..." 
             required onChange={_onSeach}  value={searchName}/>

    </div>
    <button type="button" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e)=> {
      setsearchName("") ;  setserchedliste([])
    }}>
      <MdOutlineClear/>
    </button>
</form>
     
     <div className='pt-16'>
        {
            serchedliste.map((e)=> <div key={e.uid} className=' flex justify-between items-center bg-gray-100 w-full p-4 py-2 ' >

               <div className='flex items-center'>
                <img src={e.imageUrl ?? imageProfile} alt="img" className='h-10 w-10 rounded-full inline-block' />
               <div className='inline-block'>
                <p  className='ml-2 first-letter:capitalize  text-black text-[12px] font-bold '>{e.username}</p>
                <p  className='ml-2 first-letter:capitalize  text-black text-[15px] font-semibold '>{e.name}</p>
                </div>

               </div>
               <IoMdPersonAdd color='black' className='cursor-pointer' onClick={()=> {
                _onAddUser(e)
               }}/>

            </div>)
        }
     </div>
   

    </div>
  )
}

export default SearchUser
