import { FC, useEffect, useState } from "react"
import Image from "next/image"

// Firebase
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  User,
  Unsubscribe
} from "firebase/auth"

// Helpers
import { MessageProps } from "./helpers"

type MessagePropsFromServer = {
  message: MessageProps
}

export const ChatMessage: FC<MessagePropsFromServer> = ({ message }) => {
  const auth: Auth = getAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      (_user: User | null) => {
        setUser(_user)
      }
    )
    return () => unsubscribe()
  }, [auth]);
  return (
    <div
      className={`chat-message ${user && user.uid !== message.message.creatorId ? "receiver" :
        ""
        }`}
    >
      <p className={`text-slate-800 dark:text-slate-200/90 text-left`}>
        {message.message.text}
      </p>
    </div>
  )
}
