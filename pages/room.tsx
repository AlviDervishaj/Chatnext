// Next & Router
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

// Firebase
import { collection, CollectionReference, Firestore, getDocs, getFirestore, query, Query, QuerySnapshot, where } from "firebase/firestore";

// Components
import { ChatRoom } from "../components/ChatRoom";

const Room: NextPage = () => {
  const [code, setCode] = useState<string>('');
  const router: NextRouter = useRouter();
  const firestore: Firestore = getFirestore();

  // get room code on url
  useEffect(() => {
    const checkCode = async () => {
      const _code: string | null = localStorage.getItem("code");
      if (_code === null) return router.push("/join");
      setCode(_code);
      // check room code
      if (_code.length !== 4 || isNaN(+_code)) return router.push("/create");
      const coll: CollectionReference = collection(firestore, "rooms");
      const q: Query = query(coll, where("code", "==", _code));
      const querySnapshot: QuerySnapshot = await getDocs(q);
      if (querySnapshot.empty) return await router.push("/join");
    };
    checkCode()
  }, [router])

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

      <main className="w-full h-full overflow-hidden relative mx-auto px-1 md:px-4">
        <ChatRoom code={code} />
      </main>
    </>
  )
}


export default Room;

