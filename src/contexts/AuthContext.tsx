import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = React.createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User>();

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    auth.onAuthStateChanged((user) => {
        if (!user) return;

        setCurrentUser(user);
    });

    const value = {
        currentUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
