import { Unsubscribe } from "firebase/auth";
import { getFirestore, collection, query, limit, getDocs, Firestore, onSnapshot, Query, CollectionReference, QuerySnapshot, DocumentSnapshot } from "firebase/firestore";

export const getMessages = (path: string) => {
  const firestore: Firestore = getFirestore();
  const coll: CollectionReference = collection(firestore, path);
  const q: Query = query(coll);
  const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
    const docs: Array<any> = [];

    snapshot.forEach((doc: DocumentSnapshot) => {
      docs.push(doc.data());
    });
  });
  return unsubscribe;

}
