import React, { createContext, useState, useEffect, useContext } from "react";

const StateContext = createContext();

// Helper functions for local storage
const getFromLocalStorage = (key, initialValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
};

const setToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const ContextProvider = ({ children }) => {
    const [users, setusers] = useState(() => getFromLocalStorage("users", []));
    const [openSearchModel, setopenSearchModel] = useState(false);
    const [cureentUser, setcureentUser] = useState(() => getFromLocalStorage("cureentUser", {}));
    const [selectedUserChat, setselectedUserChat] = useState({})
    const [CurrentMessages, setCurrentMessages] = useState([]);
    const [friends, setfriends] = useState([])

    const [isChatScreen, setisChatScreen] = useState(false);

    const [activeModel, setactiveModel] = useState(false);
    const [activeProfile, setactiveProfile] = useState(false);


    
  
    useEffect(() => {
        setToLocalStorage("users", users);
    }, [users]);


    useEffect(() => {
        setToLocalStorage("cureentUser"  , cureentUser);
    }, [cureentUser]);

    return (
        <StateContext.Provider value={{
            users: users,
            setusers: setusers,
            openSearchModel: openSearchModel,
            setopenSearchModel: setopenSearchModel,
            cureentUser: cureentUser,
            setcureentUser: setcureentUser,
            selectedUserChat : selectedUserChat ,
            setselectedUserChat : setselectedUserChat,
            setCurrentMessages : setCurrentMessages,
            CurrentMessages : CurrentMessages,
            setfriends : setfriends,
            friends : friends,
            isChatScreen : isChatScreen,
            setisChatScreen : setisChatScreen,
            activeModel : activeModel,
            setactiveModel : setactiveModel,
            activeProfile : activeProfile ,
            setactiveProfile : setactiveProfile
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
