import React from "react";
import { useParams } from "react-router-dom";
import AdminCurrentSnapsDisplay from "../adminConsole/currentCup/AdminCurrentSnapsDisplay";
import { useCups } from "../../firebase/hooks/UseCupsHook";

const CupAdminPage = () => {
    const { id } = useParams();
    const [cups] = useCups();

    const cup = cups.filter((c) => c.id == id)[0];

    return (
        <div className="my-3">
            <h1>Cup Admin Page</h1>
            {!!cup ? <AdminCurrentSnapsDisplay cup={cup} /> : "Loading..."}
        </div>
    );
};

export default CupAdminPage;
