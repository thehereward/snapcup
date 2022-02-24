import { useEffect, useState } from "react";
import { streamAllSnappablePeople } from "../users/GetSnappables";
import { Snappable } from "../../types";

export function useSnappablePeople(
    cupId: string
): [Snappable[], React.Dispatch<React.SetStateAction<Snappable[]>>] {
    const [snappablePeople, setSnappablePeople] = useState<Snappable[]>([]);

    useEffect(() => {
        const unsubscribe = streamAllSnappablePeople(
            (people) => setSnappablePeople(people),
            (error) => console.error(error),
            cupId
        );
        // clean up function
        return unsubscribe;
    }, [setSnappablePeople, streamAllSnappablePeople]);

    return [snappablePeople, setSnappablePeople];
}

export const updateSnappablePerson = (
    newSnappable: Snappable,
    setSnappablePeople: React.Dispatch<React.SetStateAction<Snappable[]>>
) => {
    setSnappablePeople((snappablePeople) => {
        const index = snappablePeople.findIndex(
            (val) => val.id == newSnappable.id
        );
        if (index === -1) {
            // TODO: Consider adding a new snappable person in this case
            throw Error(
                `There is no snappable person in this cup with id=${newSnappable.id}, cannot update.`
            );
        }

        const oldSnappable = snappablePeople.at(index);
        const filledInSnappable: Snappable = {
            id: newSnappable.id,
            email: newSnappable.email || oldSnappable.email,
            fullName: newSnappable.fullName || oldSnappable.fullName,
            username: newSnappable.username || oldSnappable.username,
        };

        snappablePeople[index] = filledInSnappable;
        return snappablePeople;
    });
};
