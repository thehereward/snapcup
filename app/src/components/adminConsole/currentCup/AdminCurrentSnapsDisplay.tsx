import React, { useState } from "react";
import { CupNameDisplay } from "../AdminConsoleStyles";
import SnappableManager from "../manageTeam/SnappableManager";
import CurrentCupOptionsBar from "./CurrentCupOptionsBar";
import { Cup, Entity } from "../../../types";
import { StyledHorizontalRule } from "../../transferable/styles";
import SnapList from "../../submissionPage/SnapList";
import { useSnappablePeople } from "../../../firebase/hooks/UseSnappablePeopleHook";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";
import { snapsToCsvDownload } from "../csvTools";
import DownloadButton from "../manageTeam/DownloadButton";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [snaps] = useSnapsInCup(props.cup.id);
    const [snappables] = useSnappablePeople(props.cup.id);
    const [status, setStatus] = useState({ status: IDLE });

    const onClickDownload = () => {
        try {
            setStatus({ status: LOADING });
            snapsToCsvDownload(snaps);
            setStatus({ status: IDLE });
        } catch (error) {
            setStatus({ status: ERROR, error: error.message });
        }
    };

    return (
        <div>
            <div className="d-flex">
                <CupNameDisplay>{props.cup.name}</CupNameDisplay>
                <div className="flex-grow-1" />
                <CurrentCupOptionsBar cup={props.cup} />
            </div>
            <SnappableManager
                currentSnaps={snaps}
                snappablePeople={snappables}
                cupId={props.cup.id}
            />
            <hr />
            <header className="mb-2 d-flex justify-content-between">
                <h2>
                    <span className="mr-2">Snaps</span>
                    <span className="badge badge-pill badge-light">
                        Sent: {snaps.length}
                    </span>
                </h2>
                <DownloadButton
                    onClick={onClickDownload}
                    disabled={status.status === LOADING}
                    label="Download current snaps as CSV."
                />
            </header>
            <StyledHorizontalRule />
            <SnapList snaps={snaps} cup={props.cup} />
        </div>
    );
};

export default AdminCurrentSnapsDisplay;
