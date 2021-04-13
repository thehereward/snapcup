import styled, { keyframes } from "styled-components";
import { MentionsInput } from "react-mentions";
// @ts-ignore
import Elle from "../../images/Elle";

export const ElleImg = styled(Elle)`
    max-height: 250px;
`;

export const SnapSubmissionColumnDiv = styled.div`
    background-color: var(--purple-textbox);
    padding-top: 3%;
    padding-bottom: 3%;
    border-radius: 10px 10px 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SnapCupText = styled.p`
    text-align: center;
    font-family: var(--asap);
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: white;
`;

export const SnapCupTextArea = styled(MentionsInput)`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    width: 95%;
    resize: none;
    background-color: white;
    height: 250px;
    outline: none;
    margin-left: auto;
    margin-right: auto;
`;

export const LabelText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: var(--text-normal);
    margin-bottom: 5px;
`;

export const HelperText = styled(LabelText)`
    font-size: 12px;
    line-height: 16px;
    margin-right: 10px;
`;

//animation: ${successWobbleAnimation} 1s linear;

const errorWobbleAnimation = keyframes`
25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const successExpandAnimation = keyframes`
0% {
    opacity:0;
    transform:  rotate(0deg) scaleX(1) scaleY(1) ;
  }
  50% {
    opacity:1;
    transform:  rotate(0deg) scaleX(1.1) scaleY(1.1) ;
  }
  100% {
    opacity:0;
    transform:  rotate(0deg) scaleX(1) scaleY(1) ;
  }
`;

export const SnapItButton = styled.button`
    margin-left: 5%;
    margin-right: auto;
    width: 85%;
    animation: ${(props) =>
            props.success
                ? successExpandAnimation
                : props.error
                ? errorWobbleAnimation
                : "none"}
        1s linear;
    background: var(--purple-button-default);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 0px;
    &:hover {
        background-color: var(--purple-button-hover);
        border: 2px solid var(--button-hover-border);
        box-sizing: border-box;
        box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    }
    &:focus {
        background-color: var(--purple-button-focus);
        border: 0px;
        box-shadow: none;
    }
    &:active {
        background-color: var(--purple-button-focus);
        border: 0px;
        box-shadow: none;
    }
`;
