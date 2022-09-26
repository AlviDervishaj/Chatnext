// Next & React
import { useState, useEffect } from "react";
import type { AppProps } from 'next/app'
import { NextRouter, useRouter } from "next/router";

// Styling
import '../styles/globals.css'

// Firebase
import { initializeApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged, Unsubscribe, User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Helpers
import { checkRoute } from "../global_helpers";

// Config fontawesome
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {

  const router: NextRouter = useRouter();
  const [_, setTheme] = useState<string>("light");

  useEffect(() => {
    let lsTheme = localStorage.getItem("theme");
    if (lsTheme === null) {
      localStorage.setItem("theme", "light");
      lsTheme = "light";
    }
    setTheme(lsTheme);
    if (lsTheme === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyBQUNUDAWiQrx6zVKBKFV4ftxeszw_WAPI",
    authDomain: "chatnext-2907.firebaseapp.com",
    projectId: "chatnext-2907",
    storageBucket: "chatnext-2907.appspot.com",
    messagingSenderId: "840499752451",
    appId: "1:840499752451:web:62466225505237af96e836",
    measurementId: "G-1HYHXMW2ZQ"
  };

  const app = initializeApp(firebaseConfig);
  const auth: Auth = getAuth(app);
  getStorage(app);
  getFirestore(app);

  useEffect(() => {
    const unsub: Unsubscribe = onAuthStateChanged(auth, (_user: User | null) => {
      const pathname: string = router.pathname;
      const isRouteProtected: boolean = checkRoute(pathname);
      if (isRouteProtected && _user === null) return router.replace("/");
      return;
    });
    return () => unsub();
  }, [router, auth]);

  return <Component {...pageProps} />
}

export default MyApp
