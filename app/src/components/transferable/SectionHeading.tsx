import MiniElleImg from "./MiniElleImg";
import React from "react";
import { SectionHeadingH2, StyledHorizontalRule } from "./styles";

const SectionHeading: React.FunctionComponent = (props: { title: string }) => {
    return (
        <div>
            <SectionHeadingH2>
                <MiniElleImg />
                {props.title}
            </SectionHeadingH2>
            <StyledHorizontalRule />
        </div>
    );
};

export default SectionHeading;
