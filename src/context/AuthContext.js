import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged,sendPasswordResetEmail, signOut } from "firebase/auth";


const AuthContext = createContext();

export function AuthContextProvider ({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, Currentuser => {
            setUser(Currentuser);
        });

        return unsubscribe;
    }
    , []);



    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, resetPassword, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
