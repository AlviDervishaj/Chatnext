import { FieldValue } from "firebase/firestore";

export type MessageProps = {
  message: {
    text: string,
    dateCreated: string,
    readableDate: string,
    timestamp: FieldValue,
    creatorPhoto: string | null,
    creatorId: string,
    room: string,
  }
}
