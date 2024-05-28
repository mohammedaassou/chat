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
    const [CurrentMessages, setCurrentMessages] = useState([{text : "test"}]);
    const [amisinfo, setamisinfo] = useState([])

    const [isChatScreen, setisChatScreen] = useState(false);
  
    useEffect(() => {
        setToLocalStorage("users", users);
    }, [users]);


    useEffect(() => {
        setToLocalStorage("cureentUser" , cureentUser);
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
            setamisinfo : setamisinfo,
            amisinfo : amisinfo,
            isChatScreen : isChatScreen,
            setisChatScreen : setisChatScreen
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
