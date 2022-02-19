import React from "react";
import { Cup, Entity } from "../../types";
import { getCurrentUserName } from "../../firebase/users/UserService";
import YourSnaps from "../submissionPage/YourSnaps";
import SubmissionBoxWrapper from "../submissionPage/SubmissionBoxWrapper";
import SubmissionTextBox from "../submissionPage/SubmissionTextBox";
import NoTextBoxMessage from "../submissionPage/NoTextBoxMessage";
import { useCups } from "../../firebase/hooks/UseCupsHook";

const SubmissionPage = () => {
    const [cups] = useCups();

    function currentCup() {
        const openCups = cups.filter((cup) => isAcceptingSnaps(cup));
        if (openCups.length) {
            return openCups[0];
        } else {
            return undefined;
        }
    }

    function isAcceptingSnaps(cup?: Entity<Cup>) {
        if (!cup) {
            return false;
        }
        if (!cup.isOpen) {
            return false;
        }

        return true;
    }

    return (
        <>
            <div className="row">
                <p className="col fw-bold colour-primary font-size-30 my-2">
                    Welcome, {getCurrentUserName().split(" ")[0]!}
                </p>
            </div>
            <SubmissionBoxWrapper>
                {currentCup() ? (
                    <SubmissionTextBox
                        cup={currentCup()}
                        user={getCurrentUserName()}
                    />
                ) : (
                    <NoTextBoxMessage
                        message={
                            "Uh oh! We're not collecting snaps right now. Try again later."
                        }
                    />
                )}
            </SubmissionBoxWrapper>
            {currentCup() && <YourSnaps cup={currentCup()} />}
        </>
    );
};

export default SubmissionPage;
