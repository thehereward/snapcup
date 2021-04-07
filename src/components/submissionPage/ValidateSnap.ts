import MentionElements from '~types/MentionElements'
import Snap from '../../firebase/snap/Snap'
import { GetCharacterCountRemaining } from './CharactersLeftDisplay'

/* Validates a snap */
const ValidateSnap = (snap: Snap, snappedUsers: MentionElements[]): Boolean => {
    /* Conditions for Valid Snap:
        1. Message Length (without metadata) < 280 
        2. From field must not be empty
        3. Timestamp field must not be empty
    */
    const condition1: boolean = (GetCharacterCountRemaining(snap.body, snappedUsers) >= 0)
    const condition2: boolean = snap.from && (snap.from.length > 0)
    const condition3: boolean = snap.timestamp != null
    return (condition1 && condition2 && condition3)
}

export default ValidateSnap