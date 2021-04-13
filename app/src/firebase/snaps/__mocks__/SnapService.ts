import Snap from "../../../types/Snap";
import { Entity } from "../../../types/Entity";

export async function submitSnap(snap: Snap) {
    return;
}

export async function deleteSnap(snap: Snap) {
    return;
}

export function streamSubmittedSnapsForCurrentUser(
    onSnapsReceived: (snaps: Entity<Snap>[]) => void,
    onError: (error: Error) => void,
    snapId: string
): () => void {
    const mockSnaps = [
        {
            id: "mock-snap-id",
            to: ["Jane", "Bob"],
            from: "Helen",
            timestamp: new Date(),
            body: "Hello there",
        },
    ];
    onSnapsReceived(mockSnaps);
    return () => {
        return;
    };
}

export function streamAllSnapsInCup(
    onSnapsReceived: (snaps: Entity<Snap>[]) => void,
    onError: (error: Error) => void,
    cupId: string
): () => void {
    const mockSnaps = [
        {
            id: "mock-snap-id",
            to: ["Jane", "Bob"],
            from: "Helen",
            timestamp: new Date(),
            body: "Hello there",
        },
    ];
    onSnapsReceived(mockSnaps);
    return () => {
        return;
    };
}
