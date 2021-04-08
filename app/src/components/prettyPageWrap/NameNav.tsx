import React from "react";
import styled from "styled-components";

const Name = styled.p`
    font-family: var(--open-sans);
    font-weight: 600;
    font-size: 20px;
    color: var(--purp-selected) !important;
    text-decoration: none !important;
    line-height: 27px;
    justify-content: center;
    align-items: center;
`;

const NameNav: React.FunctionComponent = ({ name }) => {
    return (
        <a className="nav-link disabled" href="#">
            <Name>{name}</Name>
        </a>
    );
};

export default NameNav;
