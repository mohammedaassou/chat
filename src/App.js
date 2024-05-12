
import React, { useEffect, useState } from 'react';
import { ProtectedRoute } from './components/protectedRoute';
import Auth from './screens/Auth';
import Chat from './screens/chat'
import { Route, Routes , BrowserRouter } from 'react-router-dom';
import { auth } from './API/firebase';
import { onAuthStateChanged } from 'firebase/auth';


function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }
   
    return <Chat/>;

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Auth user={user}></Auth>}></Route>
        <Route
          path="/chat"
          element={
            <ProtectedRoute user={user}>
              <Chat></Chat>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App