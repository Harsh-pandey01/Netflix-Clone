// Import the functions you need from the SDKs you need
import { auth, app } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({});
  //   function to create a sign up with email,pass

  const signUpUserWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      return user; // you can return this to use later in UI
    } catch (error) {
      console.error(error);
      throw error; // rethrow if you want to handle in UI
    }
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserDetail(userCredential.user);
      return userCredential.user; // return user object
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      throw error; // rethrow so caller can handle it
    }
  };

  const LogOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetail(user);
        console.log("User UID:", user.uid);
      } else {
        // User is signed out
        console.log("No user signed in");
        setUserDetail({});
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUpUserWithEmailPassword,
        userDetail,
        loginWithEmailPassword,
        LogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
