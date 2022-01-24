import React from "react";
import Elle from "../../images/Elle";

const SectionHeading = (props: { title: string }) => {
    return (
        <div className="mt-3">
            <h2>
                <Elle className="mini-elle-image" />
                {props.title}
            </h2>
            <p className="styled-horizontal-rule" />
        </div>
    );
};

export default SectionHeading;
