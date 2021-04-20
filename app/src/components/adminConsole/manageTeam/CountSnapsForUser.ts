import { Snap } from "../../../types";

export function countSnapsForUser(id: string, snaps: Snap[]) {
    return snaps.filter((snap) => {
        return snap.to.includes(id);
    }).length;
}
