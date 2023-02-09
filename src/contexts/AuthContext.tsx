import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = React.createContext({} as any);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User>();

    const login = async (email: string, password: string) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err);
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) return;

            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
