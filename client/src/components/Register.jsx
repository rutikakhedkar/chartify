import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/Images/bg.jpg";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // To track the form step
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    interests: [],
    mood: '',
  });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle interests selection
  const handleInterestsChange = (interest) => {
    setFormData((prevState) => ({
      ...prevState,
      interests: prevState.interests.includes(interest)
        ? prevState.interests.filter((item) => item !== interest)
        : [...prevState.interests, interest],
    }));
  };

  // Go to the next step
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try{
      const response = await fetch(`https://chartify-duia-mdmqnbe9h-rutikakhedkars-projects.vercel.app/api/register/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(response.ok)
      {
        console.log("submitted successfully",data.message)
        navigate(`/friendlist/${data.message.username}`); 
      }
      else
      {
        console.error(
          "There was an error adding the project!, ERROR:",
          data.message
        );
        toast.error(data.message || "something went wrong")
      }
    }
    catch(error)
    {
     console.error("There was an error adding the user")
     toast.error(error || "something went wrong")
    }
    // Navigate to the next page
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Chartify😄</h1>

        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-lg font-bold mb-4">What are your interests?</h2>
            <div className="mb-4">
              {['Music', 'Travel', 'Sports', 'Movies', 'Books', 'Nature'].map((interest) => (
                <label key={interest} className="block mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestsChange(interest)}
                  />
                  {interest}
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">What's your current mood?</h2>
            <div className="mb-4">
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="">Select your mood</option>
                <option value="Happy">Happy</option>
                <option value="Excited">Excited</option>
                <option value="Curious">Curious</option>
                <option value="Chill">Chill</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
