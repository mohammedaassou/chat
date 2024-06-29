import React, { useEffect, useState } from 'react'
import CreateUser from '../API/users/create_user';
import { useStateContext } from '../context/context';
import InvalideUserModel from '../components/invalide_user_model';
import login from '../API/auth/login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';





function Login({handleClick}){

  const {setcureentUser ,  setisInvalideUser} = useStateContext();

  const clssInput = ' md:w-72 text-white outline-none  text-sm p-1 px-3 placeholder:text-xs bg-transparent border-b-2 border-b-white';
  const [inputs, setinputs] = useState({
    email : null,
    password : null
  });

  const _onlogin = async ()=>{
    
    const {email , password} = inputs;

    
    const user = await login(email , password);
      
    // if the data entreed is invalid, display model 
    if(!user){
      setisInvalideUser(p=>!p);
      return;
    }

    setcureentUser({uid : user.uid, email : user.email});

    console.log(user);

    
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setinputs({ ...inputs, [name]: value });
  };


 return <div className='flex flex-col items-center justify-center h-[100%]'>
       <h1 className='font-bold text-2xl sm:text-3xl text-white text-center'>Login to chat</h1>
        
        <form className=' flex flex-col'>
          <input type="email" name='email' className={'mb-2 mt-10 ' + clssInput}
          required placeholder='Enter you email' onChange={handleInputChange}/>
          <input type="password" name='password' className={"mb-10"+clssInput} 
          required placeholder='Enter you password' onChange={handleInputChange}/>

          <button 
          className="bg-blue-500 block hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={_onlogin} type='button'>
          Login
          </button>
          
          <button type='button'  onClick={handleClick}
          className="text-white mt-1 block sm:hidden">
          Create account?
          </button>
        </form>
 </div>
}



function SignUp({handleClick}){
  
   const {setcureentUser , setselectedUserChat} =  useStateContext();

  const [inputs, setinputs] = useState({
    name : null,
    email : null,
    username : null,
    password : null
  });
   
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setinputs({ ...inputs, [name]: value });
    };

    const _onsubmit = async()=>{
      
   
     
     const isValid = (inputs.name!= null || inputs.username!=null) &&  Array.from(inputs.name).join("").trim().length > 4 && Array.from(inputs.username).join("").trim().length > 4
      
      if(!isValid)
        return;


     
     const {email , password , name , username } = inputs;

             signInWithEmailAndPassword(email , password) 
             .then((userCredential) => {
              const user = userCredential.user;
           // get uid for add it in database
         
             const {uid} = user
            
             
           // add all data to databases
              CreateUser({email : email ,
                name : name ,
                uid : uid, 
                username : username ,
                friendsUid : [] ,
                about : "about me",
                newMessages : [],
                isOnline : true ,
                time : new Date().toLocaleString()
              })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

   


  const clssInput = ' md:w-72 text-white outline-none  text-sm p-1 px-3 placeholder:text-xs bg-transparent border-b-2 border-b-white';

 return  <div className=' flex flex-col items-center justify-center h-[100%]'>
 <h1 className='font-bold text-2xl sm:text-3xl text-white text-center'>Sign in to chat</h1>
  
  <form className=' flex flex-col'>
  <input type="text" name='name'  className={'mb-2 mt-10 ' + clssInput}
    required placeholder='Enter your name' maxLength={20} onChange={handleInputChange} />
    <input type="text" name='username' className={'mb-2 ' + clssInput}
    required placeholder='Enter your username' onChange={handleInputChange}/>
    <input type="email" name='email' className={'mb-2' + clssInput}
    required placeholder='Enter your email' onChange={handleInputChange}/>
    <input type="password" name='password' className={"mb-10"+clssInput} 
    required placeholder='Enter your password' onChange={handleInputChange}/>

    <button type='button'
    className="bg-blue-500 block hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
    
    onClick={_onsubmit}>
    Sign in
    </button>
    <button type='button'  onClick={handleClick}
          className="text-white mt-1 block sm:hidden">
          login?
          </button>
  </form>
  </div>
}



function Welcome({handleClick , isLogin}){
  return <div className='flex  flex-col w-full justify-center items-center '>
    <h1 className='text-main font-bold text-4xl'>Welcome</h1>
    <button
    className="bg-transparent block 
    hover:opacity-85 transition 
    text-main font-bold py-2 px-4 border mt-4 
    border-main rounded-2xl" 
    onClick={handleClick}>
      { isLogin ? "Login": "Sign up"}
    </button>

  </div>
}


function Auth({user}) {

  const [isLogin, setisLogin] = useState(true);
  
  const {isInvalideUser} = useStateContext();
  
  if (user) {
    return <Navigate to="/chat"></Navigate>;
  }
 

  return (
    <div className='flex h-[100vh]'>
      { 
       isInvalideUser &&
        <InvalideUserModel />
      }
      <div className='flex-1 bg-main'>
        {
          isLogin ? 
          <Login handleClick = {()=> setisLogin(false)}/>
        : <SignUp handleClick = {()=> setisLogin(true)}/>
        }
      </div>

      <div className='flex-1  hidden sm:flex  h-full  '>
        <Welcome isLogin = {!isLogin} handleClick = {()=> setisLogin(prev=>!prev)}/>
      </div>
      
    </div>
  )
}

export default Auth
