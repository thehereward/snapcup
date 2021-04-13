import Snap from "../../../types/Snap";

export async function submitSnap(snap: Snap) {
    return;
}

export async function deleteSnap(snap: Snap) {
    return;
}

export function streamSubmittedSnapsForCurrentUser(
    onSnapsReceived: (snaps: Snap[]) => void,
    onError: (error: Error) => void
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

export function streamNumberOfSnapsForSnappable(
    onNumberReceived: (numSnaps: number) => void,
    onError: (error: Error) => void,
    snappableId: String
): () => void {
    onNumberReceived(1);
    return () => {
        return;
    };
}
