import React from 'react';

export default function Message({ item }) {
  const parsedData = JSON.parse(localStorage.getItem('chat-app-login-user-data'));
  const chatAlign = parsedData._id === item.sender._id ? 'items-end' : 'items-start';

  const createdAt = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// console.log(item)
  return (
    <div className={`flex flex-col ${chatAlign} m-3`}>
      {/* User */}
      <div className={`flex  gap-2 mb-1 ${parsedData._id !== item.sender._id ? 'flex-row-reverse' : ''}`}>
        {/* Text */}
        <div className={`${parsedData._id !== item.sender._id ? "text-left " : "text-right"}`}>
          <div
            className={`p-2 ${parsedData._id !== item.sender._id ? "bg-[#5f65e2] rounded-r-lg rounded-tl-lg text-white": "bg-primary-50 rounded-l-lg rounded-tr-lg text-black" } shadow-md z-10  text-sm max-w-lg break-words`}
            data-kt-element="message-text"
          >
            {item.message}
          </div>
          {/* Time */}
          <span className="text-black text-xs px-1 ">{createdAt}</span>
        </div>
        {/* Avatar */}
        <div className={`bg-primary-50 border-gray-400 rounded-full w-9 h-9 flex items-center justify-center`}>
          <img
            alt="Pic"
            src={item.sender.pic}
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
