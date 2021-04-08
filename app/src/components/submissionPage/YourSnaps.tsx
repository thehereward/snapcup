import React from "react";
import { useState, useEffect } from "react";
import Snap from "../../firebase/snaps/Snap";
import { getSubmittedSnapsForCurrentUser } from "../../firebase/snaps/SnapService";
import SnapList from "./SnapList";

const YourSnaps: React.FunctionComponent = () => {
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(async () => {
        try {
            const snaps = await getSubmittedSnapsForCurrentUser();
            setSnaps(snaps);
        } catch (error) {
            setError(error);
        }
    }, []);

    return (
        <div>
            <h2>Your snaps:</h2>
            {error && <p>Error: {error}</p>}
            {snaps.length > 0 && <SnapList snaps={snaps} />}
        </div>
    );
};

export default YourSnaps;
