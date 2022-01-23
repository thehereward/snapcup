import React from "react";
import { Cup, Entity, Snap } from "../../types";
import { formatTimestamp, getBodyElements } from "./helpers/snapFormatting";
import TrashIcon from "../../images/TrashIcon";
import { deleteSnap } from "../../firebase/snaps/SnapService";

interface SnapListProps {
    snaps: Snap[];
    cup: Entity<Cup>;
}

const SnapList = (props: SnapListProps) => {
    const { snaps, cup } = props;
    function formatBody(body: string) {
        const elements = getBodyElements(body);
        return elements.map((e, i) => (
            <span
                key={i}
                className={e.isTag ? "text-light-purple font-weight-bold" : ""}
            >
                {`${e.isTag ? "@" : ""}${e.text}`}
            </span>
        ));
    }

    const onDeleteSnapPressed = async (snap: Entity<Snap>) => {
        if (!confirm("Are you sure you want to delete this snap?")) {
            return;
        }
        try {
            await deleteSnap(snap, cup.id);
        } catch (error) {
            alert(`There was an error deleting your snap ${error.message}`);
        }
    };

    const listItems = snaps.map((snap: Entity<Snap>) => (
        <div className="col-lg-4 mb-4" key={snap.id}>
            <div className="snap-card">
                <div className="snap-text">
                    <div className="snap-card-body">
                        {formatBody(snap.body)}
                    </div>
                    <div className="snap-card-spacer" />
                    <div className="snap-card-footer">
                        {formatTimestamp(snap.timestamp)}
                        <div className="snap-card-spacer" />
                        {cup.isOpen && (
                            <button
                                className="trash-button "
                                onClick={() => onDeleteSnapPressed(snap)}
                            >
                                <TrashIcon
                                    className="styled-tash-icon"
                                    alt="Delete snap"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ));

    return <div className="row">{listItems}</div>;
};

export default SnapList;
