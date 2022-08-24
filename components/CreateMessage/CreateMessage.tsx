// Next & React
import { NextComponentType } from "next";
import { ChangeEvent, MouseEvent, TouchEvent, useEffect, useState } from "react";

// Firebase
import { getAuth, Auth, onAuthStateChanged, unsubscribe } from "firebase/auth";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { getCurrentDate, getReadableTime } from "../../global_helpers";
import { MessageProps } from "../ChatMessage/helpers";

export const CreateMessage: NextComponentType = () => {
  // Handle Message Text
  const [messageText, setMessageText] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => { }, [])

  const handleMessageCreation: Function = (event: TouchEvent | MouseEvent): void => {
    event.preventDefault();
    // use trimmed text as message text
    const trimmedText: string = messageText.trim();
    if (messageText === "" || trimmedText === "") return;
    console.log(getReadableTime(), getCurrentDate());
    const messageProps: MessageProps = {
      text: trimmedText,
      creatorId: currentUser.uid
    }

  }

  return (
    <form className={"w-full h-auto px-1 absolute bottom-0 left-0 mb-2 py-1"}>
      <div className={"flex w-full h-auto flex-row items-center content-center"}>
        <input type="text" value={messageText} onChange={(event: any) => setMessageText(event.target.value)} className={"w-full h-auto py-2 px-3 text-slate-100 bg-slate-600 rounded-full"} placeholder="Message .." />
        <button className={"w-1/5 md:w-1/6 lg:w-1/12 h-auto "}
          onClick={(event: MouseEvent | TouchEvent) => handleMessageCreation(event)}>
          <FontAwesomeIcon icon={faPaperPlane} className={"text-white text-xl"} />
        </button>
      </div>
    </form>
  )
}
