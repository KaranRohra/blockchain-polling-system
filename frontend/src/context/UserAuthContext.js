import { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "firebaseConfig";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function googleLogin() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscirbe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscirbe();
    }, []);

    return (
        <userAuthContext.Provider
            value={{
                user: user,
                register: register,
                login: login,
                logout: logout,
                googleLogin: googleLogin,
            }}
        >
            {children}
        </userAuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(userAuthContext);
};
