import type { Timestamp } from "@firebase/firestore-types";

export default interface Cup {
    isPublished: boolean;
    isOpen: boolean;
    timeCreated: Timestamp;
    name: string;
    timePublished: Timestamp | null;
}
