import React from "react";
import { Cup, Entity, Snap } from "../../types";
import {
    BodyElement,
    formatTimestamp,
    getBodyElements,
} from "./helpers/snapFormatting";
import TrashIcon from "../../images/TrashIcon";
import { deleteSnap } from "../../firebase/snaps/SnapService";

interface SnapListProps {
    snaps: Snap[];
    cup: Entity<Cup>;
}

function BodyElement(props: { element: BodyElement }) {
    const { element } = props;
    if (element.isTag) {
        return (
            <mark className="text-light-purple font-weight-bold p-0">
                {`@${props.element.text}`}
            </mark>
        );
    } else {
        return <span>{element.text}</span>;
    }
}

function SnapBody(props: { body: string }) {
    const elements = getBodyElements(props.body);
    return (
        <>
            {elements.map((e, i) => {
                return <BodyElement key={i} element={e} />;
            })}
        </>
    );
}

const SnapList = (props: SnapListProps) => {
    const { snaps, cup } = props;

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
            <div className="background-colour-white h-100 rounded-lg shadow-lg px-4 py-3">
                <div className="flow snap-text font-family-open-sans d-flex flex-column w-100 h-100 justify-content-between">
                    <div>
                        <SnapBody body={snap.body} />
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center colour-text-muted">
                        {formatTimestamp(snap.timestamp)}
                        {cup.isOpen && (
                            <button
                                className="trash-button"
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
