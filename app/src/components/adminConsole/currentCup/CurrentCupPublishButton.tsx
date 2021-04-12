import React from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import { CupWithId } from "../../../types/Cup";

const CurrentCupPublishButton: React.FunctionComponent = (props: {
    CupWithId: CupWithId;
    updateIsCup: () => void;
}) => {
    const handlePublish = () => {
        //change publish status in firebase
        //re-find isCup
        return null;
    };
    return (
        <CurrentCupOptionsButton onClick={handlePublish}>
            Publish SnapCup
        </CurrentCupOptionsButton>
    );
};

export default CurrentCupPublishButton;
