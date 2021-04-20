import { MentionElements, Snap } from "../../types";
import { GetCharacterCountRemaining } from "./CharactersLeftDisplay";

/* Validates a snap */
const validateSnap = (snap: Snap, snappedUsers: MentionElements[]): Boolean => {
    /* Conditions for Valid Snap:
        1. Message Length (without metadata) < 280 
        2. From field must not be empty
        3. To field must not be undefined
        4. Timestamp field must not be empty
        5. Body should not be empty
    */
    const condition1: boolean =
        GetCharacterCountRemaining(snap.body, snappedUsers) >= 0;
    const condition2: boolean = snap.from && snap.from.length > 0;
    const condition3: boolean = !(snap.to === undefined);
    const condition4: boolean = snap.timestamp != null;
    const condition5: boolean = snap.body.trim() != "";
    return condition1 && condition2 && condition3 && condition4 && condition5;
};

export default validateSnap;
