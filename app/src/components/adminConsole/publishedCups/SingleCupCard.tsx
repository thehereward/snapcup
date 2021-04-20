import React from "react";
import { Cup, Entity } from "../../../types";
import styled from "styled-components";
import ExportSnaps from "../ExportSnaps";

function formatTimePublished(seconds: number): string {
    const d = new Date(seconds * 1000);
    return (
        "Published: " +
        d.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "2-digit",
        })
    );
}

const CupCard = styled.div`
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    postion: relative;
    height: 100%;
    background: var(--purple-textbox);
`;

const CupText = styled.div`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: bold;
    line-height: 27px;
    color: var(--text-normal);
    padding: 20px 33px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: left;
`;

const NoMarginP = styled.p`
    margin-bottom: 0;
`;

const CupCardName = styled(NoMarginP)`
    font-size: 18px;
`;

const CupCardDate = styled(NoMarginP)`
    font-size: 14px;
`;

const SingleCupCard: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const timemsg =
        props.cup.timePublished == undefined
            ? ""
            : formatTimePublished(props.cup.timePublished.seconds);
    return (
        <div className="col-sm-6 col-md-4 mb-4" key={props.cup.id}>
            <CupCard>
                <CupText>
                    <CupCardName>{props.cup.name}</CupCardName>
                    <CupCardDate>{timemsg}</CupCardDate>
                    <ExportSnaps cup={props.cup} />
                </CupText>
            </CupCard>
        </div>
    );
};

export default SingleCupCard;
