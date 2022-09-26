// Firebase
import { getAuth } from "firebase/auth";
import { Auth, User } from "firebase/auth";
import { collection, FirestoreError, addDoc, getFirestore, Firestore, CollectionReference, DocumentReference } from "firebase/firestore";

// Helpers
import { MessageProps } from "../components/ChatMessage/helpers";

export const create = (message: MessageProps, location: string) => {
  const auth: Auth = getAuth();
  const user: User | null = auth.currentUser;

  if (user === null) return { info: "User not logged in", code: "400" };
  // user is logged in
  const firestore: Firestore = getFirestore();
  const coll: CollectionReference = collection(firestore, location);
  addDoc(coll, message).then((documentRef: DocumentReference) => {
    return { documentId: documentRef.id }
  }).catch((error: FirestoreError) => {
    console.log({ error });
  });
}


