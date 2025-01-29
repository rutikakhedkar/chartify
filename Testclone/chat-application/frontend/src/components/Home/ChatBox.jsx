import React, { useEffect, useState } from 'react';
import { BsEmojiSmile, BsSendFill } from 'react-icons/bs';
import Message from './ChatBox/Mesaage';
import ChatHeader from './ChatBox/ChatHeader';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/white-logo.png';
import { toast, ToastContainer } from 'react-toastify';
import ScrollableFeed from 'react-scrollable-feed'
import { sendMessage, setWebSocketReceivedMessage } from '../../redux/appReducer/action';
import Popup from 'reactjs-popup';
import EmojiPicker from "emoji-picker-react";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../assets/mainscreen/img1.png"
import img2 from "../../assets/mainscreen/img2.png"
import img3 from "../../assets/mainscreen/img3.png"


export default function ChatBox() {
  const selectedUserForChat = useSelector((state) => state.appReducer.selectedUserForChat);
  const sendMessageSuccess = useSelector((state) => state.appReducer.sendMessageSuccess);
  const sendMessageFail = useSelector((state) => state.appReducer.sendMessageFail);
  const sendMessageObj = useSelector((state) => state.appReducer.sendMessageObj);
  const sendMessageProcessing = useSelector((state) => state.appReducer.sendMessageProcessing);

  const notficationsMessages = useSelector((state) => state.appReducer.notficationsMessages);
  const getMessageProcessing = useSelector((state) => state.appReducer.getMessageProcessing);
   const getMessageData = useSelector((state) => state.appReducer.getMessageData);
  


  const webSocket = useSelector((state) => state.appReducer.webSocket)

  const [userInput, setUserInput] = useState("");
  const [showEmojiPalette, setShowEmojiPalette] = useState(false);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    let obj = {
      content: userInput.trim(),
      chatId: selectedUserForChat._id
    };

    if (!obj.content) {
      toast.warn('Write something to send', { position: toast.POSITION.BOTTOM_LEFT });
    } else {
      dispatch(sendMessage(obj));
    }
  };


  // Toggle emoji palette visibility
  const handleEmojiClick = (e) => {
    setShowEmojiPalette((prevState) => !prevState);
  };

  // Handle emoji selection
  const handleSelectEmoji = (emojiObject) => {
    setUserInput((prevInput) => prevInput + emojiObject.emoji);
  };

  useEffect(() => {
    return () => {
      webSocket.off("message received");
    };
  }, [webSocket]);

  useEffect(() => {
    if (!sendMessageProcessing && !sendMessageFail && sendMessageSuccess) {
      setUserInput("");
      webSocket.emit("new message", sendMessageObj);
      dispatch(setWebSocketReceivedMessage(getMessageData, sendMessageObj, notficationsMessages, selectedUserForChat));
    }



    if (!sendMessageProcessing && sendMessageFail && !sendMessageSuccess) {
      toast.error('Message not sent. Try again.', { position: toast.POSITION.BOTTOM_LEFT });
    }
  }, [sendMessageSuccess, sendMessageFail, sendMessageProcessing]);

  useEffect(() => {
    const handleNewMessageReceived = (newMessageRec) => {
      dispatch(setWebSocketReceivedMessage(getMessageData, newMessageRec, notficationsMessages, selectedUserForChat));
    };

    webSocket.on("message received", handleNewMessageReceived);

    return () => {
      webSocket.off("message received", handleNewMessageReceived);
    };
  }, [webSocket, selectedUserForChat, getMessageData]);




  if (!selectedUserForChat) {
    return (
      <div className="flex flex-col h-4/5">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          autoPlay
          infiniteLoop
          interval={3000}
          className="w-64"
        >
          <div>
            <img src={img1} alt="carousel-img-1" className="w-64 h-64 mx-auto" />
          </div>
          <div>
            <img src={img2} alt="carousel-img-2" className="w-64 h-64 mx-auto" />
          </div>
          <div>
            <img src={img3} alt="carousel-img-3" className="w-64 h-64 mx-auto" />
          </div>
        </Carousel>
        <h4 className="mt-4 text-[25px] font-semibold text-[#5f65e2]">Chartify</h4>
        <p className="mt-2 text-[18px] font-semibold">Stay Connected, Stay Chartified!</p>
      </div>
    </div>
    );
  }

  return (
    <>
      <ChatHeader />

      <div className="flex flex-col h-4/5 px-4 py-2 pb-4 mt-10">
        <div className="flex h-full flex-col max-h-[75vh] overflow-y-auto bg-[#fff]  rounded-lg mb-2">
          {getMessageProcessing && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
              <span className="mr-2 text-black">Loading Messages</span>
            </div>
          )}
          <ScrollableFeed>
            {Array.isArray(getMessageData) && getMessageData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <img className="w-20 h-20 mr-2" src={logo} alt="logo" />
                <p className="text-black">Start Chating!</p>
              </div>
            ) : (
              Array.isArray(getMessageData) && getMessageData.map((item) => (
                <Message item={item} key={item.id} />
              ))
            )}
          </ScrollableFeed>
        </div>

        <div className="relative mt-2">
          <input
            disabled={sendMessageProcessing}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            className="border-t-2 border-gray-200 text-primary-900 font-semibold text-[18px] block w-full h-24 p-2 pr-[10rem]" // Add padding-right to avoid overlap
            placeholder="Type your message..."
          />

          {/* Button Container */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {/* Emoji Button */}
            <Popup
              trigger={
                <button type="button" className="px-4 py-2 text-[#5f65e2] font-bold focus:outline-none">
                  <BsEmojiSmile className="w-6 h-6" onClick={handleEmojiClick} />
                </button>
              }
              position="top right"
              arrow={false}
              open={showEmojiPalette}
              onClose={() => setShowEmojiPalette(false)}
            >
              <div>{showEmojiPalette && <EmojiPicker onEmojiClick={handleSelectEmoji} />}</div>
            </Popup>

            {/* Plus Button */}
            <button type="button" className="px-4 py-2 text-primary-800 focus:outline-none">
             <FaPlus className="w-6 h-6 text-[#5f65e2]" />
            </button>

            {/* Send Button */}
            <button
              disabled={sendMessageProcessing}
              type="button"
              className="h-12 px-4 py-2 rounded-lg hover:bg-[#8489f0] bg-[#5f65e2] text-primary-100 focus:outline-none"
              onClick={handleSendMessage}
            >
              {sendMessageProcessing ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Sending</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              ) : (
                <FaArrowRightLong  className ="text-lg font-bold text-white"/>
              )}
            </button>
          </div>
        </div>

      </div>

      <ToastContainer />
    </>
  );
}
