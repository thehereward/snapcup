import { useState, useEffect } from "react";
import { streamAllSnapsInCup } from "../snaps/SnapService";
import { Entity, Snap } from "../../types";

export function useSnapsInCup(cupId: string): [Entity<Snap>[]] {
    const [snaps, setSnaps] = useState<Snap[]>([]);

    useEffect(() => {
        const unsubscribe = streamAllSnapsInCup(
            (people) => setSnaps(people),
            (error) => console.error(error),
            cupId
        );
        // clean up function
        return unsubscribe;
    }, [setSnaps, streamAllSnapsInCup]);

    return [snaps];
}
