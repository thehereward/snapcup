import { useState, useEffect } from "react";
import { streamAllCups } from "../cups/CupService";
import { Cup, Entity } from "../../types";

export function useCups(): [Entity<Cup>[]] {
    const [cups, setCups] = useState<Entity<Cup>[]>([]);
    useEffect(() => {
        const unsubscribe = streamAllCups(
            (cups) => setCups(cups),
            (error) => console.error(error)
        );
        // clean up function
        return unsubscribe;
    }, [setCups, streamAllCups]);

    return [cups];
}
