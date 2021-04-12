import React, { useState, useCallback } from "react";
import { setCupOpenness } from "../../../firebase/cups/CupService";

const CurrentCupOpennessButton = ({ cup, setCup }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    let buttonText = `${cup.isOpen ? "Close" : "Open"} SnapCup`;
    if (error) {
        buttonText += "- " + error;
    }

    const clickSetOpenness = useCallback(() => {
        (async () => {
            try {
                setLoading(true);
                await setCupOpenness(cup.id, !cup.isOpen);
                setLoading(false);
                setError("");
                setCup({ ...cup, isOpen: !cup.isOpen });
            } catch (err) {
                console.error(err);
                setError("Error!");
            }
        })();
    }, [cup.id, cup.isOpen, setLoading, setError, setCup]);

    return (
        <button
            className="btn btn-purple"
            disabled={loading}
            onClick={clickSetOpenness}
        >
            {buttonText}
        </button>
    );
};

export default CurrentCupOpennessButton;
