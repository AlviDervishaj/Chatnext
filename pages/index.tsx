// Next & React
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useState } from "react";

// Firebase
import {
  onAuthStateChanged,
  Auth,
  getAuth,
  User,
  Unsubscribe,
} from "firebase/auth";

// Components
import { Authenticate } from "../components/Authenticate";
import { Loading } from "../components/Loading";

const Home: NextPage = () => {
  const auth: Auth = getAuth();
  const router: NextRouter = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      (_user: User | null) => {
        if (_user === null) return setIsLoading(false);
        else router.push("/create");
      }
    );
    return () => unsubscribe();
  }, [auth]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <title>Chatnext</title>
        <meta name="title" content="Chatnext" />
        <link rel="icon" href="https://portfolio-alvi.vercel.app/static/images/high.png" />
        <meta
          name="description"
          content="Chatnext a simple and reliable communication tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chatnext.vercel.app/" />
        <meta property="og:title" content="Chatnext" />
        <meta
          property="og:description"
          content="Chatnext a simple and reliable communication tool."
        />
        <meta
          property="og:image"
          content="https://portfolio-alvi.vercel.app/static/images/high.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://chatnext.vercel.app/" />
        <meta property="twitter:creator" content="@alvi_d1" />
        <meta property="twitter:title" content="Chatnext" />
        <meta
          property="twitter:description"
          content="Chatnext a simple and reliable communication tool."
        />
        <meta
          property="twitter:image"
          content="https://portfolio-alvi.vercel.app/static/images/high.png"
        />
      </Head>
      <main className="w-full h-full relative">
        {
          isLoading ? <Loading />
            : <Authenticate />
        }
      </main>
    </>
  );
};
export default Home;

