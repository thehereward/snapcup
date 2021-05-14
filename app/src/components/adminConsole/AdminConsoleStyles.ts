import styled from "styled-components";

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
