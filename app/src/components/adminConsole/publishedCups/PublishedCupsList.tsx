import React from "react";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";
import styled from "styled-components";
import { MessageDisplay } from "../AdminConsoleStyles";

function formatTimePublished(date: Date): string {
    return date.toDateString();
}

const CupCard = styled.div`
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    postion: relative;
    height: 100%;
    background: #7040d6;
`;

const CupText = styled.div`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: bold;
    line-height: 27px;
    color: #faf8f8;
    padding: 20px 33px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: left;
`;

const CupCardName = styled.p`
    color: var(--white);
    padding: 0;
    margin: 0 0 13px 0;
    font-size: 18px;
`;

const CupCardDate = styled.p`
    color: var(--white);
    padding: 0
    margin: 0 0 13px 0;
    font-size: 14px;
`;

const PublishedCupsList: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    const listCups = props.cups.map((cup: Entity<Cup>) => {
        const time =
            cup.timePublished == undefined
                ? ""
                : formatTimePublished(cup.timePublished);
        console.log(time);
        return (
            <div className="col-sm-6 col-md-4 mb-4" key={cup.id}>
                <CupCard>
                    <CupText>
                        <CupCardName>{cup.name}</CupCardName>
                        <CupCardDate>Published: {time}</CupCardDate>
                    </CupText>
                </CupCard>
            </div>
        );
    });
    if (props.cups.length > 0) {
        return <div className="row">{listCups}</div>;
    } else {
        return <MessageDisplay>No published cups yet!</MessageDisplay>;
    }
};

export default PublishedCupsList;
