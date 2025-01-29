import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, selectUserForChat } from '../../../redux/appReducer/action';

const DisplayChatCard = ({ item }) => {

  const webSocket = useSelector((state) => state.appReducer.webSocket)
  const parsedData = JSON.parse(localStorage.getItem('chat-app-login-user-data'));
  const dispatch = useDispatch();


  const [selectedChat, setSelectedChat] = useState(null);

  // Select User For Chat
  const handelSelectUserForChat = () => {
    dispatch(selectUserForChat(item));
    dispatch(getMessage(item._id));
    webSocket.emit("join chat", item._id)
  };

  // Find the user from item that doesn't match the _id in parsedData
  const selectedUser = item.users.find(user => user._id !== parsedData._id);

  return (
    <div
      onClick={() => setSelectedChat(item.id)}
      className={`cursor-pointer shadow-md mt-3 hover:shadow-lg hover:ring-2 hover:ring-primary-200 transition-shadow duration-200  border-b-2 p-4
      ${selectedChat === item.id ? "bg-[#5f65e2]" : ""}
  `}
    >
      <div className="flex items-center space-x-4 p-4">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-md"  // Removed "rounded-full" to keep it simple
            src={item.isGroupChat ? "https://cdn-icons-png.flaticon.com/512/2043/2043173.png" : selectedUser.pic}
            alt={`${item.name} image`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-md font-semibold text-primary-100 truncate">
            {item.isGroupChat ? item.chatName : selectedUser.name}
          </p>
          <p className="text-xs font-semibold text-primary-400 truncate">
            {item.latestMessage ? item.latestMessage.message : ""}
          </p>
        </div>
      </div>
    </div>

  );
};

export default DisplayChatCard;
