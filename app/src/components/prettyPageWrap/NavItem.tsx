import styled from "styled-components";

export const NavItem = styled.span`
    font-family: var(--open-sans);
    font-weight: 600;
    font-size: 20px;
    color: var(--purple-hover) !important;
    text-decoration: none !important;
    line-height: 27px;
    padding: 0.5rem 1rem;
`;

export const NavItemClickable = styled(NavItem)`
    cursor: pointer;

    &:hover {
        color: var(--purple-selected) !important;
    }
`;
