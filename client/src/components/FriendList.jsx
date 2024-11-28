import React from "react"
import { useFriendList } from '../context/friendlist';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


function FriendList() {
  const navigate = useNavigate();
  const {usersData} = useFriendList();
  const { username } = useParams();
  // console.log(username)
  // Static friend data for demo purposes
  const friends = [
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/100?u=alice"},
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/100?u=bob" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/100?u=charlie" },
    { id: 4, name: "Diana", avatar: "https://i.pravatar.cc/100?u=diana" },
  ];

  let random ={ 
    1: "https://i.pravatar.cc/100?u=alice", 
    2: "https://i.pravatar.cc/100?u=bob", 
    3:"https://i.pravatar.cc/100?u=charlie",
    4: "https://i.pravatar.cc/100?u=diana",
    5: "https://i.pravatar.cc/100?u=diana",
    6: "https://i.pravatar.cc/100?u=alice", 
    7: "https://i.pravatar.cc/100?u=bob", 
    8:"https://i.pravatar.cc/100?u=charlie",
    9: "https://i.pravatar.cc/100?u=diana",
    10: "https://i.pravatar.cc/100?u=diana",
  }

  
  // console.log(usersData);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
    <h1>Welcome, {username}</h1>
      <h3 className="text-2xl font-bold mb-4 text-center">Friends List having the similar interest</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {usersData
    .filter(friend => friend.username !== username) // Exclude the logged-in user
    .map((friend, index) => (
      <div
        key={friend.id}
        className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-50 cursor-pointer transition"
        onClick={() => navigate(`/chat/${friend.username}`)}
      >
        <img
          src={random[index] || "https://i.pravatar.cc/100?u=diana"}
          alt={friend.username}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{friend.username}</h2>
          <p className="text-sm text-gray-500">{friend.mood}</p>
          <p className="text-sm text-gray-500">Available to chat</p>
        </div>
      </div>
    ))}
</div>

    </div>
  );
}

export default FriendList;
