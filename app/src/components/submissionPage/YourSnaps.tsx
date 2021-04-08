import React from "react";
import { useState, useEffect } from "react";
import Snap from "../../types/Snap";
import { streamSubmittedSnapsForCurrentUser } from "../../firebase/snaps/SnapService";
import SnapList from "./SnapList";

const YourSnaps: React.FunctionComponent = () => {
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = streamSubmittedSnapsForCurrentUser(
            (updatedSnaps) => setSnaps(updatedSnaps),
            (error) => setError(error.message)
        );
        // clean up function
        return unsubscribe;
    }, [setSnaps, setError]);

    return (
        <div>
            <h2>Your snaps:</h2>
            {error && <p>Error: {error}</p>}
            {snaps.length > 0 && <SnapList snaps={snaps} />}
        </div>
    );
};

export default YourSnaps;
