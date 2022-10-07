// Next & React
import { useState, useEffect } from "react";
import type { AppProps } from 'next/app'
import Head from "next/head";
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

  useEffect(() => {
    let lsTheme = localStorage.getItem("theme");
    if (lsTheme === null) {
      localStorage.setItem("theme", "light");
      lsTheme = "light";
    }
    if (lsTheme === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    // load service worker
    /* Only register a service worker if it's supported */
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Service Worker Registered");
        });
    }
  })

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

  return <>
    <Head>
      <meta name="application-name" content="Chatnext" />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Chatnext" />

      <meta name="format-detection" content="telephone=no" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://chatnext.vercel.app/" />
      <meta property="og:title" content="Chatnext" />
      <meta property="og:description" content="Chatnext a simple and reliable communication tool." />
      <meta property="og:image" content="https://portfolio-alvi.vercel.app/static/images/high.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://chatnext.vercel.app/" />
      <meta property="twitter:creator" content="@alvi_d1" />
      <meta property="twitter:title" content="Chatnext" />
      <meta property="twitter:description" content="Chatnext a simple and reliable communication tool." />
      <meta property="twitter:image" content="https://portfolio-alvi.vercel.app/static/images/high.png" />

      <meta name="mobile-web-app-capable" content="yes" />

      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      <meta name="theme-color" content="#0f172a" />
      <meta charSet="utf-8" />
      <meta name="title" content="Chatnext" />
      <meta name="description" content="Chatnext a simple and reliable communication tool." />

      <meta name="msapplication-TileColor" content="#3a506b" />
      <meta name="msapplication-tap-highlight" content="no" />

      <title>Chatnext</title>

      <link rel="manifest" href="/static/icons/manifest.json" />
      <link rel="icon" href="https://portfolio-alvi.vercel.app/static/images/high.png" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
