import styled from "styled-components";
import Elle from "../../images/Elle";

export const SectionHeader = styled.h2`
    font-family: Asap;
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purple-selected);
    margin-botton: 10px;
`;

export const MiniElleImg = styled(Elle)`
    height: 66px;
    width: auto;
    vertical-align: text-bottom;
    margin-right: 19px;
`;

export const NewCupButton = styled.button`
    font-family: Asap;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    margin-right: auto;
    margin-left: 10px;
    background: #a07ee8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 0px;
    &:hover {
        background-color: var(--purple-selected);
        border: 0px;
    }
    &:focus {
        background-color: var(--purple-focus);
        border: 0px;
        box-shadow: none;
    }
    &:disabled {
        background-color: #aaaaaa;
        border: 0px;
    }
`;

export const MessageDisplay = styled.p`
    font-family: Asap;
    font-weight: 500;
    font-size: 16px;
    color: var(--purple-selected);
`;
