import { MentionElements } from "../../types";

function GetExtraLength(snappedUsers: MentionElements[]): number {
    let total = 280;
    for (var elem of snappedUsers) {
        total = total + elem.id.length + 5;
    }
    return total;
}

export default GetExtraLength;
