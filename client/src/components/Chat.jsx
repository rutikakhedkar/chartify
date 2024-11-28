import React, { useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmileWink } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useFriendList } from "../context/friendlist";
import { toast } from "react-toastify";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [sticker, setSticker] = useState(null);

  const { username } = useParams();
  const { usersData, userMessages } = useFriendList();
  // console.log(userMessages);

  // Find user ID for the sender
  const sender = usersData?.find((user) => user.username === username)?._id;

  // Placeholder avatars
  const senderAvatar = "https://via.placeholder.com/40"; // Replace with sender's avatar URL
  const recipientAvatar = "https://via.placeholder.com/40"; // Replace with recipient's avatar URL

  const sendMessage = async () => {
    console.log(sender)
    if (!sender) {
      toast.error("Unable to send message. User ID is missing.");
      return;
    }

    if (newMessage.trim() || attachment || sticker) {
      // const newMessageObject = {
      //    newMessage,
      //    sender,
      //    attachment,
      //    sticker,
      // };

      try {
        const response = await fetch("https://chartify-duia-mdmqnbe9h-rutikakhedkars-projects.vercel.app/api/chat/createchat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newMessage,
            sender,
            attachment,
            sticker}),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Message sent successfully!");
          // setMessages((prev) => [...prev, newMessageObject]);
          setNewMessage("");
          setAttachment(null);
          setSticker(null);
        } else {
          toast.error(data.message || "Failed to send message.");
        }
      } catch (error) {
        console.error("Error submitting message:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.error("Message cannot be empty.");
    }
  };

  const receiveMessage = () => {
    setMessages((prev) => [
      ...prev,
      {
        text: "This is a recipient's reply.",
        sender: false,
        attachment: null,
        sticker: null,
      },
    ]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(URL.createObjectURL(file)); // Replace with file object for backend
    }
  };

  const handleStickerClick = (stickerUrl) => {
    setSticker(stickerUrl);
    setShowStickerPicker(false);
  };

  const stickerSet = [
    "https://example.com/sticker1.png", // Example sticker URL
    "https://example.com/sticker2.png", // Example sticker URL
    "https://example.com/sticker3.png", // Example sticker URL
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Chat Header */}
      <div className="p-4 bg-white shadow-md flex items-center">
        <img
          src={recipientAvatar}
          alt="Recipient Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
  {/* Check if userMessages exists */}
  {userMessages?.length > 0 ? (
    userMessages.map((msg, index) => {
      // Find the user based on msg.sender
      const sameUser = usersData.find((user) => user._id === msg.sender);

      // Check if the user is the same as the current user
      return sameUser?.username === username ? (
        <div
          key={index}
          className={`flex items-center mb-4 ${msg.sender ? "justify-end" : "justify-start"}`}
        >
          {/* If the message is from the recipient, show recipient's avatar on the left */}
          {!msg.sender && (
            <img
              src={recipientAvatar}
              alt="Recipient"
              className="w-10 h-10 rounded-full mr-2"
            />
          )}

          {/* Message box */}
          <div
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.sender ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800"
            }`}
          >
            {msg.message}
            {msg.attachment && (
              <div className="mt-2">
                <a href={msg.attachment} target="_blank" rel="noopener noreferrer">
                  {/* <img
                    src={msg.attachment}
                    alt="Attachment"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-400"
                  /> */}
                  
                </a>
                {attachment && attachment.name}
              </div>
            )}
            {msg.sticker && (
              <div className="mt-2">
                {/* <img
                  src={msg.sticker}
                  alt="Sticker"
                  className="w-12 h-12"
                /> */}
              </div>
            )}
          </div>

          {/* If the message is from the sender, show sender's avatar on the right */}
          {msg.sender && (
            <img
              src={senderAvatar}
              alt="Sender"
              className="w-10 h-10 rounded-full ml-2"
            />
          )}
        </div>
      ) : null;
    })
  ) : (
    <p className="text-center text-gray-500">No messages for this user.</p>
  )}
</div>



      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-300">
        <div className="flex items-center space-x-2 mb-2">
          <RiAttachment2
            className="text-xl cursor-pointer text-gray-600"
            onClick={() => document.getElementById("file-input").click()}
          />
          <input
            type="file"
            id="file-input"
            className="hidden"
            accept="image/*,video/*,application/pdf"
            onChange={handleFileChange}
          />
          <FaRegSmileWink
            className="text-xl cursor-pointer text-gray-600"
            onClick={() => setShowStickerPicker(!showStickerPicker)}
          />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Send
          </button>
          <button
            onClick={receiveMessage}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Simulate Reply
          </button>
        </div>

        {/* Sticker Picker */}
        {showStickerPicker && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-3 gap-2">
              {stickerSet.map((stickerUrl, index) => (
                <img
                  key={index}
                  src={stickerUrl}
                  alt="Sticker"
                  className="w-12 h-12 cursor-pointer"
                  onClick={() => handleStickerClick(stickerUrl)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
