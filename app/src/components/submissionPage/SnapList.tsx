import React from "react";
import Snap from "../../types/Snap";
import styled, { css } from "styled-components";

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

const SnapCardHeading = styled.p`
    font-weight: bold;
    var(--text-grey);
    padding: 0;
    margin: 0 0 13px 0;
`;

const SnapCardBody = styled.p`
    color: var(--text-grey);
    padding: 0;
    margin: 0 0 13px 0;
`;

const SnapCardSpacer = styled.div`
    flex-grow: 1;
`;

const SnapCardFooter = styled.p`
    color: var(--text-muted);
    padding: 0;
    margin: 0;
`;

const SnapList: React.FunctionComponent<SnapListProps> = ({ snaps }) => {
    function formatAts(ats: String[]): String {
        return ats.map((s) => `@${s}`).join(" ");
    }

    function formatTimestamp(date: Date) {
        return date.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
        });
    }

    const listItems = snaps.map((snap: Snap, index: number) => (
        <div className="col-sm-6 col-md-4 mb-4" key={index}>
            <SnapCard>
                <SnapText>
                    <SnapCardHeading>{formatAts(snap.to)}</SnapCardHeading>
                    <SnapCardBody>{snap.body}</SnapCardBody>
                    <SnapCardSpacer />
                    <SnapCardFooter>
                        {formatTimestamp(snap.timestamp)}
                    </SnapCardFooter>
                </SnapText>
            </SnapCard>
        </div>
    ));

    return <div className="row">{listItems}</div>;
};

export default SnapList;
