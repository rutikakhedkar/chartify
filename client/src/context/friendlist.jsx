import React, { createContext, useEffect, useState, useContext } from 'react';
// import { io } from "socket.io-client";
// const socket = io("https://chartify-duia.vercel.app");
// Create the context
const FriendlistContext = createContext();

// Create the provider component
const FriendlistProvider = ({ children }) => {
    const [usersData, setUsersData] = useState([]);
    const [username,setUsername]= useState();
    const [userMessages, setUserMessages] = useState();
   const getUsersData = async () => {
    try {
      const response = await fetch(`https://chartify-h961.vercel.app/api/register/getusers`, {
        method: "GET",
      });
      if (response.ok) {
        const usersData = await response.json();
        setUsersData(usersData.message);
      }
    } catch (error) {
      console.log("Authentication error : " + error.message);
    }
  };


  const getUsersMessage = async () => {
    try {
      const response = await fetch(`https://chartify-h961.vercel.app/api/chat/getchat`, {
        method: "GET",
      });
      if (response.ok) {
        const usersMessage = await response.json();
        setUserMessages(usersMessage.message);
      }
    } catch (error) {
      console.log("error " + error.message);
    }
  };

  
  // console.log(userMessages);

    // useEffect(() => {
    //     getUsersData();
    //     getUsersMessage();
    // },[]);

      const handleUserMessage =()=>{
        console.log("socket works")
        getUsersMessage();
      }

    // useEffect(()=>{
    //   socket.on("messageSent",handleUserMessage);
    //   return()=>{
    //   socket.off("messageSent",handleUserMessage);
    //   }
    // })

    return (
        <FriendlistContext.Provider value={{ usersData, getUsersData,username,setUsername,getUsersMessage, userMessages }}>
            {children}
        </FriendlistContext.Provider>
    );
};

export { FriendlistContext, FriendlistProvider }; // Ensure correct export
export const useFriendList = () => useContext(FriendlistContext);
