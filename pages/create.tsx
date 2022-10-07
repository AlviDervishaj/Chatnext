// Next & React
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { MouseEvent, TouchEvent, useEffect, useState } from "react";

// Firebase
import { getAuth, Auth, onAuthStateChanged, User, Unsubscribe, signOut } from "firebase/auth";

// Components
import { Navigation } from "../components/Navigation";
import { Loading } from "../components/Loading";
import {
  collection, CollectionReference, Firestore, getFirestore,
  query, Query, QuerySnapshot, where,
  getDocs, addDoc,
  DocumentReference,
  serverTimestamp,
} from "firebase/firestore";

// Helpers
import { getCurrentDate, getReadableTime } from "../global_helpers";
import Link from "next/link";

const Create: NextPage = () => {
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
    setIsLoading(false);
    setError(_error);
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
      return setAllowSubmit(true);
    };
  }

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("code");
      await signOut(auth);
    } catch (error: any) {
      console.log({ error });
    }
  }



  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (_user: User | null) => {
      if (_user === null) return router.push("/");
      setUser(_user);
    });
    return () => unsubscribe();
  }, [auth, router])

  const createRoom = async (event: TouchEvent | MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const q: Query = query(coll, where('code', '==', roomCode));
    const room: QuerySnapshot = await getDocs(q);
    if (!room.empty) return displayError("Room already exists !");
    setError("");
    // create room collection
    const roomRef: DocumentReference = await addDoc(coll, {
      users: [user?.uid],
      code: roomCode,
      dateCreated: getCurrentDate(),
      readableTime: getReadableTime(false),
      timestamp: serverTimestamp(),
    });
    setIsLoading(false);
    localStorage.setItem("code", roomCode);
    return await router.push('/room');
  }

  return (
    <>
      <main className="w-full h-full overflow-hidden relative mx-auto px-4">
        <Navigation handleLogOut={handleLogOut} />
        <form className="h-full flex flex-col items-center content-center justify-center gap-4">
          <input type={"text"} pattern={"^[0-9]{4}$"} placeholder="Create a new room to chat !" className="room-code" maxLength={4} max={9999}
            min={0o0} value={roomCode} onChange={(event: any) => handleRoomCode(event.target.value)} />
          <p className="text-error-light dark:text-error-dark text-center mx-auto pt-4">{error}</p>
          <button
            onClick={(event: TouchEvent | MouseEvent) => createRoom(event)}
            className="border disabled:bg-blue-500/20 disabled:text-slate-200/40 disabled:border-sky-500/20 disabled:cursor-not-allowed border-sky-500 text-slate-200 bg-blue-500 px-2 py-1 rounded-full"
            disabled={!allowSubmit}
          >Create Room</button>
          <section className="relative w-fit h-fit pt-20">
            {
              isLoading && <Loading />
            }
          </section>
        </form>
        <Link href={'/join'} passHref>
          <a className="text-sky-400 absolute bottom-10 right-5 md:hover:underline underline-offset-2 transition-all duration-200 ease-in-out">Have a Code ?</a>
        </Link>
      </main>
    </>
  )
}

export default Create;
