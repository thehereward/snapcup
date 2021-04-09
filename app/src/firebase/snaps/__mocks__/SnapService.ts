import Snap from "../../../types/Snap";

export async function submitSnap(snap: Snap) {
    return;
}

export async function deleteSnap(snap: Snap) {
    return;
}

export function streamSubmittedSnapsForCurrentUser(
    onSnapsRecieved: (snaps: Snap[]) => void,
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
    onSnapsRecieved(mockSnaps);
    return () => {
        return;
    };
}
