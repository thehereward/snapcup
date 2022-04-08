import { useEffect, useState } from "react";
import {
    getAllSnappablePeopleOnce,
    streamAllSnappablePeople,
} from "../users/GetSnappables";
import { Snappable } from "../../types";

export function useSnappablePeople(
    cupId: string,
    subscribeToUpdates: boolean
): [Snappable[], React.Dispatch<React.SetStateAction<Snappable[]>>] {
    const [snappablePeople, setSnappablePeople] = useState<Snappable[]>([]);

    if (subscribeToUpdates) {
        useEffect(() => {
            const unsubscribe = streamAllSnappablePeople(
                (people) => setSnappablePeople(people),
                (error) => console.error(error),
                cupId
            );
            // clean up function
            return unsubscribe;
        }, [streamAllSnappablePeople]);
    } else {
        useEffect(() => {
            getAllSnappablePeopleOnce(cupId).then((people) =>
                setSnappablePeople(people)
            );
        }, [getAllSnappablePeopleOnce]);
    }

    return [snappablePeople, setSnappablePeople];
}
