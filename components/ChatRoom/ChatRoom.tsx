// React & Next
import { NextComponentType } from "next";
import { useEffect, useState } from "react";

// Components
import { Navigation } from "../Navigation";
import { CreateMessage } from "../CreateMessage";

// Firebase
import {
  getFirestore, Unsubscribe, collection, query, Firestore, onSnapshot,
  Query, CollectionReference, QuerySnapshot, DocumentSnapshot, DocumentData
} from "firebase/firestore";

export const ChatRoom: NextComponentType = () => {
  const [messages, setMessages] = useState<Array<DocumentData>>([]);
  useEffect(() => {
    const firestore: Firestore = getFirestore();
    const coll: CollectionReference = collection(firestore, "messages");
    const q: Query = query(coll);
    const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      const docs: Array<DocumentData> = [];
      snapshot.forEach((doc: DocumentSnapshot) => {
        if (doc.exists()) {
          docs.push(doc.data());
        };
      });
      setMessages(docs);
    });
    return () => unsubscribe();
  }, [])

  return (
    <main className={"w-full h-full px-4"}>
      <Navigation />
      <h2 className="text-gray-800 dark:text-slate-200">
        {messages && messages.map((message: DocumentData) => message.text)}
      </h2>
      <CreateMessage />

    </main>
  )
}
