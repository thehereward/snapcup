import styled from "styled-components";
import Elle from "../../images/Elle";

export const SectionHeader = styled.h2`
    position: relative;
    font-family: var(--asap);
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
    font-family: var(--asap);
    font-weight: 500;
    font-size: 18px;
    color: var(--white);
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
        background-color: var(--our-grey);
        border: 0px;
    }
`;

export const MessageDisplay = styled.p`
    font-family: var(--asap);
    font-weight: 500;
    font-size: 16px;
    color: var(--purple-selected);
`;

export const CupNameDisplay = styled.p`
    font-family: var(--asap);
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
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    border-radius: 10px;
    border-color: var(--purple-button-default);
    background-color: transparent;
    color: var(--purple-button-default);
    margin-left: 10px;
    &:hover {
        color: var(--purple-selected);
        border-color: var(--purple-selected);
    }
    &:disabled {
        color: var(--our-grey);
    }
    ${(props) =>
        props.className &&
        `
        color: var(--danger-button);
        border-color: var(--danger-button);
        &:hover {
            color: var(--danger-button-hover);
            border-color: var(--danger-button-hover);
            background-color: var(--danger-button);
        }
    `}
`;

export const FileUploadWrapper = styled.span`
    position: relative;
    overflow: hidden;
    input[type="file"] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        background: white;
        cursor: inherit;
        display: block;
    }
`;

export const StyledDownloadButton = styled.button`
    all: unset;
    position: absolute;
    right: 0;
    bottom: 0;
    img {
        height: 30px;
        width: auto;
        margin: 0;
        padding: 0;
    }
`;
