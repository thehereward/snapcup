import React from "react";
import SnappableManager from "./SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";

const AdminConsole = () => {
    return (
        <>
            <hr />
            <h2>Admin Console</h2>
            <SnappableManager />
            <CurrentCup isCup={false} isOpen={false} />
        </>
    );
};

export default AdminConsole;
