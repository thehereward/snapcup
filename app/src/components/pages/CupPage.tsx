import React from "react";
import { useParams } from "react-router-dom";
import CurrentSnapsDisplay from "../adminConsole/currentCup/CurrentSnapsDisplay";
import { useCups } from "../../firebase/hooks/UseCupsHook";

const CupPage = () => {
    const { id } = useParams();
    const [cups] = useCups();

    const cup = cups.filter((c) => c.id == id)[0];

    return (
        <div className="my-3">
            {!!cup ? <CurrentSnapsDisplay cup={cup} /> : "Loading..."}
        </div>
    );
};

export default CupPage;
