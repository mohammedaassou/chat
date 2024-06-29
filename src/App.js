
import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from './components/protectedRoute';
import Auth from './screens/Auth';
// import Chat from './screens/chat'
// import { Route, Routes , BrowserRouter } from 'react-router-dom';
// import Loading from './components/loading';

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);


    
    // if(isFetching)
    // return <div className='flex justify-center items-center h-screen '><Loading/></div> 
  

  return (
    <div>

      <Auth/>
      
    </div>


    // <BrowserRouter>
    //   <Routes>
    //     <Route index path="/" element={<Auth user={user}></Auth>}></Route>
    //     <Route
    //       path="/chat"
    //       element={
    //         <ProtectedRoute user={user}>
    //           <Chat user = {user}/>
    //         </ProtectedRoute>
    //       }
    //     ></Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App