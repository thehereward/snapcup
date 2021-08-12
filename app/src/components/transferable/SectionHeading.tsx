import MiniElleImg from "./MiniElleImg";
import React from "react";
import { StyledHorizontalRule } from "./styles";

const SectionHeading: React.FunctionComponent = (props: { title: string }) => {
    return (
        <div>
            <h2>
                <MiniElleImg />
                {props.title}
            </h2>
            <StyledHorizontalRule />
        </div>
    );
};

export default SectionHeading;
