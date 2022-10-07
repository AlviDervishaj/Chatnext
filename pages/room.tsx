// Next & Router
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

// Firebase
import { collection, CollectionReference, Firestore, getDocs, getFirestore, query, Query, QuerySnapshot, where } from "firebase/firestore";

// Components
import { ChatRoom } from "../components/ChatRoom";

const Room: NextPage = () => {
  const [code, setCode] = useState<string>('');
  const router: NextRouter = useRouter();
  const firestore: Firestore = getFirestore();
  const coll: CollectionReference = collection(firestore, "rooms");

  // get room code on url
  useEffect(() => {
    const checkCode = async () => {
      const _code: string | null = localStorage.getItem("code");
      if (_code === null) return router.push("/join");
      setCode(_code);
      // check room code
      if (_code.length !== 4 || isNaN(+_code)) return router.push("/create");
      const q: Query = query(coll, where("code", "==", _code));
      const querySnapshot: QuerySnapshot = await getDocs(q);
      if (querySnapshot.empty) return await router.push("/join");
    };
    checkCode()
  }, [router, coll])

  return (
    <>
      <main className="w-full h-full overflow-hidden relative mx-auto px-1 md:px-4">
        <ChatRoom code={code} />
      </main>
    </>

  )
}


export default Room;

