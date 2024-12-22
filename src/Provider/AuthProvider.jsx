import React, { useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";

 const GoogleProvider =  new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // new user create 
    const createUser = (email , password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const signInUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    // update Profile 
    const updateUserProfile = (updatedData)=>{
        return updateProfile(auth.currentUser,updatedData)
    }

    // signOut user 
    const signOutUser = ()=>{
        setLoading(true);
        return signOut(auth)
    }

    // social login 
    const signInWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth, GoogleProvider)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            // console.log('current user', currentUser)
            setUser(currentUser)
            setLoading(false)

        })
        return ()=>{
            unsubscribe()
        }
       },[])

    const authInfo = {
        user,
        createUser,
        updateUserProfile,
        loading,
        signInUser,
        signOutUser,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;