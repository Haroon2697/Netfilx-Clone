import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; 
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail, 
    signOut 
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Ensure the listener is cleaned up
    }, []);

    async function login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        return await signOut(auth);
    }

    async function resetPassword(email) {
        return await sendPasswordResetEmail(auth, email);
    }

    async function signUp(email, password) {
        await createUserWithEmailAndPassword(auth, email, password); // Await the promise
        await setDoc(doc(db, "users", email), { savedShows: [] }); // Await the promise
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, resetPassword, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UserAuth() {
    return useContext(AuthContext);
}
