// Next & React
import { NextComponentType } from "next";
import { MouseEvent, TouchEvent, useCallback, useEffect, useState } from "react";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { getCurrentDate, getReadableTime } from "../../global_helpers";
import { MessageProps } from "../ChatMessage/helpers";
import { create } from "../../firebase-helpers/createMessage";

// Firebase
import { serverTimestamp } from "firebase/firestore";
import { Auth, getAuth, onAuthStateChanged, signOut, Unsubscribe, User } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";


export const CreateMessage: NextComponentType = () => {
  // Handle Message Text
  const [room, setRoom] = useState<string>("")
  const [messageText, setMessageText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User>();

  const auth: Auth = getAuth();
  const router: NextRouter = useRouter();

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async (_user: User | null) => {
      if (_user === null) return await signOut(auth);
      setUser(_user);
    })
    return () => unsubscribe();
  }, [auth]);

  // get room code
  useEffect(() => {
    const checkCode = async () => {
      const roomCode: string | null = localStorage.getItem("code");
      if (roomCode === null) return router.push("/");
      setRoom(roomCode)
    }
    checkCode();
  }, [router])

  const toggleError = useCallback((_error: string) => {
    setError(_error)
    setTimeout(() => {
      setError("");
    }, 2500);
    return;
  }, [])

  const handleMessageCreation: Function = async (event: TouchEvent | MouseEvent): Promise<any> => {
    event.preventDefault();
    // clear input
    const temp: string = messageText;
    setMessageText("");
    if (user === null) return setError("Make sure you are logged in !");
    // use trimmed text as message text
    const trimmedText: string = temp.trim();
    if (messageText === "" || trimmedText === "") {
      toggleError("Fill in message text ..");
      return;
    }
    if (user === null || user === undefined) {
      return await signOut(auth);
    }
    const message: MessageProps = {
      message: {
        text: trimmedText,
        dateCreated: getCurrentDate(),
        readableDate: getReadableTime(false),
        timestamp: serverTimestamp(),
        creatorPhoto: user.photoURL,
        creatorId: user.uid,
        room: room
      }
    }
    create({ message: message.message }, room);
  }
  return (
    <footer className={"absolute w-full h-auto bottom-0 left-0 mb-2 py-1"}>
      <form id="createMessage" className={"w-full h-auto px-1"}>
        <div className={"flex w-full h-auto flex-row items-center content-center lg:justify-center gap-1"}>
          {error !== "" && <div className={"absolute left-1/2 bottom-20 -translate-x-1/2 flex items-center conten-center justify-center text-red-500"}>{error}</div>}
          <input type="text" disabled={error !== ""} value={messageText} onChange={(event: any) => setMessageText(event.target.value)}
            className={"w-full h-auto py-2 px-3 text-slate-50 dark:text-slate-100 dark:bg-slate-600 bg-slate-800 rounded-full"} placeholder="Message .." />
          <button className={"w-10 h-10 px-2 flex items-center justify-center content-center lg:w-10 lg:h-10 bg-green-500 dark:bg-green-300/70 rounded-full"}
            onClick={(event: MouseEvent | TouchEvent) => handleMessageCreation(event)}>
            <FontAwesomeIcon icon={faPaperPlane} className={"text-white"} />
          </button>
        </div>
      </form>
    </footer>
  )
}
