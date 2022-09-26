// React & Next
import { useEffect, useState, useRef, FC } from "react"
import { useRouter, NextRouter } from "next/router";

// Components
import { Navigation } from "../Navigation"
import { CreateMessage } from "../CreateMessage"
import { Loading } from "../Loading"
import { ChatMessage } from "../ChatMessage"

// Firebase
import {
  getFirestore,
  Unsubscribe,
  collection,
  query,
  Firestore,
  onSnapshot,
  Query,
  CollectionReference,
  QuerySnapshot,
  DocumentSnapshot,
  DocumentData,
  orderBy,
} from "firebase/firestore"

// Helpers
import { ChatRoomProps } from "./helpers"

export const ChatRoom: FC<ChatRoomProps> = () => {
  const [code, setCode] = useState<string>("");
  const [messages, setMessages] = useState<Array<DocumentData>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("Waiting for server.")
  const [chatHeight, setChatHeight] = useState<number>(0)

  const router: NextRouter = useRouter();
  const scrollToMeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const _code: string | null = localStorage.getItem("code");
    if (_code === null) router.push("/join");
    const firestore: Firestore = getFirestore()
    const coll: CollectionReference = collection(firestore, `${_code}`);
    const q: Query = query(coll, orderBy("message.timestamp"))
    const unsubscribe: Unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const docs: Array<DocumentData> = []
        setStatus("Getting Messages ...")
        if (snapshot.empty) setStatus("No messages found in this room !");
        snapshot.forEach((doc: DocumentSnapshot) => {
          if (doc.exists()) {
            docs.push(doc.data())
          }
        });
        setMessages(docs)
        setStatus("Synced with server !")
        setTimeout(() => {
          scrollToMeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
          })
        }, 100)
        setIsLoading(false)
      }
    );

    return () => unsubscribe();
  }, [router])

  // set chat room height
  useEffect(() => {
    const nav = document.getElementsByTagName("nav")[0]
    const combinedHeight: number = nav.clientHeight + 72
    setChatHeight(combinedHeight);
    return;
  }, [])

  return (
    <main className={"chat-room"}>
      <div className={"chat-room-background"} />
      <Navigation />
      {isLoading ? (
        <div className={"text-center"}>
          <Loading />
          <p className={"loading-helper"}>{status}</p>
        </div>
      ) : (
        <>
          <div
            style={{ height: `calc(100vh - ${chatHeight}px)` }}
            className={`overflow-y-scroll pt-4 fancy-scrollbar w-full px-2 md:px-4`}
          >
            {messages &&
              messages.map((message: any, index: number) => (
                <ChatMessage key={index} message={message} />
              ))}
            <div ref={scrollToMeRef} />
          </div>
          <CreateMessage />
        </>
      )}
    </main>
  )
}
