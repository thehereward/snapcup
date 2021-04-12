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

export const CupNameDisplay = styled.p`
    font-family: Asap;
    font-weight: 500;
    font-size: 22px;
    color: var(--purple-selected);
`;

export const SectionHeaderUnderline = styled.p`
    width: 100%;
    height: 0px;
    left: 37px;
    top: 748px;

    border: 1px solid var(--purple-selected);
`;

export const CurrentCupOptionsButton = styled.button`
    text-align: center;
    width: 155px;
    height: 30px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    border-radius: 10px;
    border-color: #a07ee8;
    background-color: transparent;
    color: #a07ee8;
    &:hover {
        color: var(--purple-selected);
        border-color: var(--purple-selected);
    }
    &:disabled {
        color: #aaaaaa;
    }
`;
