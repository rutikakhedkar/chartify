import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../../redux/appReducer/action';
import CreateGroupChat from './AllChats/CreateGroupChat';
import DisplayChatCard from './AllChats/DisplayChatCard';


export default function AllChats() {

  const dispatch = useDispatch();
  const allChat = useSelector((state) => state.appReducer.allChat);
  const createGroupChatSuccess = useSelector((state) => state.appReducer.createGroupChatSuccess);
  const singleUserChatsuccess = useSelector((state) => state.appReducer.singleUserChatsuccess);
  const addMembersInGroupSuccess = useSelector((state) => state.appReducer.addMembersInGroupSuccess);
  const isRenameGroupSuccess = useSelector((state) => state.appReducer.isRenameGroupSuccess);
  const removeMembersFromGroupSuccess = useSelector((state) => state.appReducer.removeMembersFromGroupSuccess);
  const [selectedChat, setSelectedChat] = useState(null); 


  useEffect(() => {
    dispatch(getChats());

  }, [createGroupChatSuccess, singleUserChatsuccess, addMembersInGroupSuccess, removeMembersFromGroupSuccess, isRenameGroupSuccess])

  return (
    <div className="flex flex-col h-full flex-grow bg-[#DFE2FE]">
      <CreateGroupChat />
     
        <div className='mt-6 overflow-y-auto'>
          {allChat?.map((item) => (
             <DisplayChatCard 
             key={item._id} 
             item={item} 
             selectedChat={selectedChat}
             setSelectedChat={setSelectedChat}
           />
          ))}
        </div>
     
    </div>
  )
}
