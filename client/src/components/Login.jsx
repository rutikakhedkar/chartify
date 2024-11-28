import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/Images/bg.jpg";
import { toast } from "react-toastify";
import { useFriendList } from '../context/friendlist';



const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    interests: [],
    mood: '',
  });
  
  const { username,setUsername} = useFriendList();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await fetch(`https://chartify-duia-mdmqnbe9h-rutikakhedkars-projects.vercel.app/api/register/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.user.user.username);
        navigate(`/friendlist/${data.user.user.username}`); // Navigate after successful login
      } else {
        toast.error(data.message || "something went wrong");
        console.error("ERROR:", data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.error("There was an error logging in:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Chartify 😄</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email" // Add name attribute
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // Add name attribute
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Get in
          </button>
          <p className="mt-4 text-center">
            Want to find friends for chat?{" "}
            <span
              className="text-green-500 underline cursor-pointer"
              onClick={() => navigate(`/register/${formData.username}`)}
            >
              Register yourself
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
