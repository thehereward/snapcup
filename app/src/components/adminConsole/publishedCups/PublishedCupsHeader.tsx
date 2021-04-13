import React from "react";
import SectionHeading from "../../transferable/SectionHeading";

const PublishedCupsHeader: React.FunctionComponent = (props: {
    title: string;
}) => {
    return <SectionHeading title={props.title} />;
};

export default PublishedCupsHeader;
