// Next & React
import { NextComponentType } from "next";
import { useRouter, NextRouter } from "next/router";
import { PointerEvent, MouseEvent } from "react";
// Firebase
import {
  getAuth,
  setPersistence,
  Auth,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const SignIn: NextComponentType = () => {
  const auth: Auth = getAuth();
  const router: NextRouter = useRouter();

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
        } else return router.push('/create');
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
      <div className={"pulse-shadow"} />
      Sign In
    </button>
  );
};
