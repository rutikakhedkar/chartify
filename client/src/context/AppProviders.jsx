import React from 'react';
import { FriendlistProvider } from './friendlist'; // Named export, requires curly braces

const AppProvider = ({ children }) => {
    return (
        <FriendlistProvider>
            {children}
        </FriendlistProvider>
    );
};

export default AppProvider;
