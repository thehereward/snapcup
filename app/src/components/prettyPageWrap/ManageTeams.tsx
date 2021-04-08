import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ManageTeamsLink = styled(Link)`
    font-family: var(--open-sans);
    font-weight: 600;
    font-size: 20px;
    color: var(--purp-hover) !important;
    text-decoration: none !important;
    line-height: 27px;
    &:hover {
        color: var(--purp-selected) !important;
    }
`;

const ManageTeams: React.FunctionComponent = ({ isAdmin }) => {
    if (isAdmin) {
        return (
            <ManageTeamsLink className="nav-link" to="/admin">
                Manage Teams
            </ManageTeamsLink>
        );
    } else {
        return null;
    }
};

export default ManageTeams;
