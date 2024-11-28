import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Chat from './components/Chat.jsx';
import FriendList from './components/FriendList.jsx';
import AppProvider from './context/AppProviders.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [color, setColor] = useState("red");

  return (
    <AppProvider>
    <Router>
      <div>
        {/* Define your routes here */}
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Friendlist */}
          <Route path="/friendlist/:username" element={<FriendList/>} />

          {/* Chat Route */}
          <Route path="/chat/:username" element={<Chat />} />

          {/* Catch-All Route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </AppProvider>
  );
}

export default App;
