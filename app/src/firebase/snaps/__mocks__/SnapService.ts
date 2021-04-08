import Snap from "../../../types/Snap";

export async function submitSnap(snap: Snap) {
    return;
}

// returns an unsubscribe function
export function streamSubmittedSnapsForCurrentUser(
    onSnapsRecieved: (snaps: Snap[]) => void,
    onError: (error: Error) => void
): () => void {
    const mockSnaps = [
        {
            to: ["Jane", "Bob"],
            from: "Helen",
            timestamp: new Date(),
            body: "Hello there",
        },
    ];
    onSnapsRecieved(mockSnaps);
    return () => {
        return;
    };
}
