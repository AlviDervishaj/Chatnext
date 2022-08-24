import { Timestamp } from "firebase/firestore"

export interface MessageProps {
  text: string,
  dateCreated: string,
  readableDate: string,
  timestamp: Timestamp,
  imagePath: string | null,
  creatorId: string,
}
