import { useEffect, useState } from "react";
import { streamAllSnappablePeople } from "../users/GetSnappables";
import { Snappable } from "../../types";

export function useSnappablePeople(): [Snappable[]] {
    const [snappablePeople, setSnappablePeople] = useState<Snappable[]>([]);

    useEffect(() => {
        const unsubscribe = streamAllSnappablePeople(
            (people) => setSnappablePeople(people),
            (error) => console.error(error)
        );
        // clean up function
        return unsubscribe;
    }, [setSnappablePeople, streamAllSnappablePeople]);

    return [snappablePeople];
}
