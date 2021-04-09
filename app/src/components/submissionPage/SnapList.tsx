import React from "react";
import Snap, { Entity } from "../../types/Snap";
import styled, { css } from "styled-components";
import { formatTimestamp, getBodyElements } from "./helpers/snapFormatting";
import TrashIcon from "../../images/TrashIcon";
import { deleteSnap } from "../../firebase/snaps/SnapService";

interface SnapListProps {
    snaps: Snap[];
}

const SnapCard = styled.div`
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    postion: relative;
    height: 100%;
    background: var(--white);
`;

const SnapText = styled.div`
    padding: 20px 40px;
    font-family: Open Sans;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: left;
`;

const SnapCardBody = styled.p`
    color: var(--text-grey);
    padding: 0;
    margin: 0 0 13px 0;
`;

const SnapCardSpacer = styled.div`
    flex-grow: 1;
`;

const SnapCardFooter = styled.div`
    color: var(--text-muted);
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
`;

const StyledTrashIcon = styled(TrashIcon)`
    height: 30px;
    width: auto;
`;

const TrashButton = styled.button`
    all: unset;
`;

const SnapList: React.FunctionComponent<SnapListProps> = ({ snaps }) => {
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
            await deleteSnap(snap);
        } catch (error) {
            alert(`There was an error deleting your snap ${error.message}`);
        }
    };

    const listItems = snaps.map((snap: Entity<Snap>) => (
        <div className="col-sm-6 col-md-4 mb-4" key={snap.id}>
            <SnapCard>
                <SnapText>
                    <SnapCardBody>{formatBody(snap.body)}</SnapCardBody>
                    <SnapCardSpacer />
                    <SnapCardFooter>
                        {formatTimestamp(snap.timestamp)}
                        <SnapCardSpacer />
                        <TrashButton onClick={() => onDeleteSnapPressed(snap)}>
                            <StyledTrashIcon alt="Delete snap" />
                        </TrashButton>
                    </SnapCardFooter>
                </SnapText>
            </SnapCard>
        </div>
    ));

    return <div className="row">{listItems}</div>;
};

export default SnapList;
