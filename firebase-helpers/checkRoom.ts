// Firebase
import {
  query, Query, where,
  getFirestore, Firestore,
  CollectionReference, collection,
  QuerySnapshot,
  getDocs
} from "firebase/firestore"

// helpers
import { ReturnType } from "./helpers";

// check if room exists
export const checkIfRoomExists = async (code: string | string[] | undefined): Promise<ReturnType> => {

  const firestore: Firestore = getFirestore();
  const coll: CollectionReference = collection(firestore, "rooms");

  const q: Query = query(coll, where('code', '==', code));
  const room: QuerySnapshot = await getDocs(q);
  if (!room.empty) return { info: "Room already exists !", error: "Room Exists", code: 400 };
  return { info: "Room does not exist.", error: null, code: 200 };

}
