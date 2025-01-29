import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, selectUserForChat} from '../../../redux/appReducer/action';



const DisplayChatCard = ({ item,selectedChat, setSelectedChat}) => {
  const webSocket = useSelector((state) => state.appReducer.webSocket);
  const parsedData = JSON.parse(localStorage.getItem('chat-app-login-user-data'));
  const dispatch = useDispatch();
  const getMessageData = useSelector((state) => state.appReducer.getMessageData);
  

  // Select User For Chat
  const handelSelectUserForChat = () => {
    dispatch(selectUserForChat(item));
    dispatch(getMessage(item._id));
    setSelectedChat(item._id);  // Update selected chat id
    webSocket.emit("join chat", item._id);
  };

  // Find the user from item that doesn't match the _id in parsedData
  const selectedUser = item.users.find(user => user._id !== parsedData._id);
 console.log(getMessageData)
  return (
    <div
      onClick={handelSelectUserForChat}  // Select the chat when clicked
      className={`cursor-pointer shadow-md hover:shadow-lg hover:ring-2 hover:ring-primary-200 transition-shadow duration-200 border-b border-gray-50 p-2
        ${selectedChat === item._id ? "bg-gradient-to-r from-[#5f65e2] to-[#8a92c9]" : "bg-[#DFE2FE]"}  // Conditionally apply background color
      `}>
      <div className="flex items-center space-x-4 p-4">
        <div className="flex-shrink-0">
          <img
            className="w-14 h-14 rounded-[50%] border-2"
            src={item.isGroupChat ? "https://cdn-icons-png.flaticon.com/512/2043/2043173.png" : selectedUser.pic}
            alt={`${item.name} image`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-[17px] font-semibold ${selectedChat === item.id ? "text-[#fff]" : "text-black"} text-primary-100 truncate`}>
            {item.isGroupChat ? item.chatName : selectedUser.name}
          </p>
          <p className="text-[12px] font-semibold text-primary-400 truncate">
            {item.latestMessage ? item.latestMessage.message : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayChatCard;
