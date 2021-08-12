import React from "react";
import { useState, useEffect } from "react";
import { Snap } from "../../types";
import { streamSubmittedSnapsForCurrentUser } from "../../firebase/snaps/SnapService";
import SnapList from "./SnapList";
// @ts-ignore
import SectionHeading from "../transferable/SectionHeading";

const YourSnaps: React.FunctionComponent = ({ cup }) => {
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = streamSubmittedSnapsForCurrentUser(
            (updatedSnaps) => setSnaps(updatedSnaps),
            (error) => setError(error.message),
            cup.id
        );
        // clean up function
        return unsubscribe;
    }, [setSnaps, setError, cup]);

    return (
        <div>
            <SectionHeading title={"Your Snaps"} />
            {error && <p>Error: {error}</p>}
            {snaps.length > 0 && <SnapList snaps={snaps} cup={cup} />}
            {snaps.length == 0 &&
                "You haven't sent any snaps yet. When you do, they'll appear here."}
        </div>
    );
};

export default YourSnaps;
