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
    font-family: var(--open-sans);
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: left;
`;

const SnapCardBody = styled.p`
    color: var(--text-muted);
    padding: 0;
    margin: 0 0 13px 0;
`;

const SnapCardSpacer = styled.div`
    flex-grow: 1;
`;

const SnapCardFooter = styled.p`
    color: var(--text-main);
    padding: 0;
    margin: 0;
`;

const SnapList: React.FunctionComponent<SnapListProps> = ({ snaps }) => {
    // The regex matches something of the form [full name]
    const fullNameRegex = /\[[A-Za-z0-9 _]*\]/g;
    // The regex matches something of the form @[full name](username)
    const tagRegex = /@\[[A-Za-z0-9 _]*\]\([A-Za-z0-9 _]*\)/g;

    function formatTimestamp(date: Date) {
        return date.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
        });
    }

    function getNameFromTag(tag: string): string {
        const namePart = tag.match(fullNameRegex)[0];
        return namePart.substring(1, namePart.length - 1);
    }

    const formattedSnapBody = (body: string) => {
        const tags = body.match(tagRegex);
        if (!tags) {
            return <span>{body}</span>;
        }
        const arbitraryDelimiter = "--@!--";
        const withDelimters = body.replace(
            tagRegex,
            `${arbitraryDelimiter}$&${arbitraryDelimiter}`
        );
        const split = withDelimters.split(arbitraryDelimiter);
        return split.map((part, index) => {
            if (tags.includes(part)) {
                return (
                    <span
                        key={index}
                        className="text-light-purple"
                    >{`@${getNameFromTag(part)} `}</span>
                );
            }
            return <span key={index}>{`${part} `}</span>;
        });
    };

    const listItems = snaps.map((snap: Snap, index: number) => (
        <div className="col-sm-6 col-md-4 mb-4" key={index}>
            <SnapCard>
                <SnapText>
                    <SnapCardBody>{formattedSnapBody(snap.body)}</SnapCardBody>
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
