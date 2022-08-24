// Next & React
import { useState, useEffect } from "react";
import type { AppProps } from 'next/app'

// Styling
import '../styles/globals.css'

// Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Config fontawesome
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {

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
  getAuth(app);
  getStorage(app);
  getFirestore(app);

  return <Component {...pageProps} />
}

export default MyApp
