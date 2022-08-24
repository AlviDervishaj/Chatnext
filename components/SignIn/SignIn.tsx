import { NextComponentType } from "next";

// Firebase
import {
  getAuth,
  setPersistence,
  Auth,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { PointerEvent, MouseEvent } from "react";

export const SignIn: NextComponentType = () => {
  const auth: Auth = getAuth();

  const handleSignIn = async (event: MouseEvent | PointerEvent) => {
    event.preventDefault();
    // set persistence
    try {
      await setPersistence(auth, browserLocalPersistence);
      const authProvider: GoogleAuthProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, authProvider).catch((error: any) => {
        if (
          error.code !== "auth/cancelled-popup-request" ||
          error.code !== "auth/popup-closed-by-user"
        ) {
          console.log({ error });
        } else return;
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="authenticate"
      onClick={(event: MouseEvent | PointerEvent) => handleSignIn(event)}
    >
      Sign In
    </button>
  );
};
