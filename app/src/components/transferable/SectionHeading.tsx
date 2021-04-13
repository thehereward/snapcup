import MiniElleImg from "./MiniElleImg";
import React from "react";
import { SectionHeadingH2, SectionHeaderUnderline } from "./styles";

const SectionHeading: React.FunctionComponent = (props: { title: string }) => {
    return (
        <div>
            <SectionHeadingH2>
                <MiniElleImg />
                {props.title}
            </SectionHeadingH2>
            <SectionHeaderUnderline />
        </div>
    );
};

export default SectionHeading;
