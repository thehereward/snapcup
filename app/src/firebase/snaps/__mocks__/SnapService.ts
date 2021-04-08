import Snap from "../Snap";

export async function submitSnap(snap: Snap) {
    return;
}

export async function getSubmittedSnapsForCurrentUser(): Promise<Snap[]> {
    return [
        {
            to: ["Jane", "Bob"],
            from: "Helen",
            timestamp: new Date(),
            body: "Hello there",
        },
    ];
}
