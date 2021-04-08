import styled from "styled-components";

const NavItem = styled.span`
    font-family: var(--open-sans);
    font-weight: 600;
    font-size: 20px;
    color: var(--purp-hover) !important;
    text-decoration: none !important;
    line-height: 27px;
    padding: 0.5rem 1rem;

    &:hover {
        color: var(--purp-selected) !important;
    }
`;

export default NavItem;
