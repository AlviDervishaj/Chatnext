// Next & React
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import { useEffect, useState, MouseEvent, TouchEvent } from "react";
import { useRouter, NextRouter } from "next/router";

// Firebase
import { getAuth, Auth, User, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import {
  collection, CollectionReference, Firestore, getFirestore,
  query, Query, QuerySnapshot, where,
  getDocs
} from "firebase/firestore";

// Components
import { Navigation } from "../components/Navigation";
import { Loading } from "../components/Loading";

const Join: NextPage = () => {
  const [user, setUser] = useState<User>();
  const [roomCode, setRoomCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth: Auth = getAuth();
  const router: NextRouter = useRouter();
  const firestore: Firestore = getFirestore();
  const coll: CollectionReference = collection(firestore, "rooms");

  const displayError = (_error: string) => {
    setAllowSubmit(false);
    setError(_error);
    setIsLoading(false);
    return;
  }

  const handleRoomCode = (_code: string): void => {
    setAllowSubmit(false);
    setRoomCode(_code);
    // check if room code is an integer and does not contain any letters
    if (_code.length !== 4) return displayError("Room Number can not be less that 4 characters.");
    if (isNaN(+_code)) return displayError("Please enter a valid room code !");
    else {
      setError("");
      setAllowSubmit(true);
    }
  }

  const joinRoom = async (event: TouchEvent | MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const q: Query = query(coll, where('code', '==', roomCode));
    const room: QuerySnapshot = await getDocs(q);
    if (room.empty) return displayError("Room does not exists !");
    setError("");
    // join room
    setIsLoading(false);
    localStorage.setItem("code", roomCode);
    return await router.push('/room');
  }

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (_user: User | null) => {
      if (_user === null) return router.push("/");
      setUser(_user);
    });
    return () => unsubscribe();
  }, [auth, router])

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
      <main className="w-full h-full overflow-hidden relative mx-auto px-4">
        <Navigation />
        <form className="h-full flex flex-col items-center content-center justify-center gap-4">
          <input type={"text"} pattern={"^[0-9]{4}$"} placeholder="Join a room to talk to your friends !" className="room-code" maxLength={4} max={9999}
            min={0o0} value={roomCode} onChange={(event: any) => handleRoomCode(event.target.value)} />
          <p className="text-red-500 text-center mx-auto pt-4">{error}</p>
          <button
            onClick={(event: TouchEvent | MouseEvent) => joinRoom(event)}
            className="border disabled:bg-blue-500/20 disabled:text-slate-200/40 disabled:border-sky-500/20 disabled:cursor-not-allowed border-sky-500 text-slate-200 bg-blue-500 px-2 py-1 rounded-full"
            disabled={!allowSubmit}
          >Join Room</button>
          <section className="relative w-fit h-fit pt-20">
            {
              isLoading && <Loading />
            }
          </section>
        </form>
        <Link href={'/create'} passHref>
          <a
            className="text-sky-400 absolute bottom-10 right-5 md:hover:underline underline-offset-2 transition-all duration-200 ease-in-out"
          >Create a room</a>
        </Link>
      </main>
    </>
  )
}

export default Join;
