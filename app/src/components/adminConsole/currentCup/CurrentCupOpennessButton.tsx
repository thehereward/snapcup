import React, { useState, useCallback } from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import { setCupOpenness } from "../../../firebase/cups/CupService";

const CurrentCupOpennessButton = ({ cup }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    let buttonText = `${cup.isOpen ? "Close" : "Open"} Snap Cup`;
    if (error) {
        buttonText += "- " + error;
    }
    if (loading) {
        buttonText = "Loading";
    }

    const clickSetOpenness = async () => {
        try {
            setLoading(true);
            await setCupOpenness(cup.id, !cup.isOpen);
            setLoading(false);
            setError("");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 500);
        } catch (err) {
            console.error(err);
            setError("Error!");
        }
    };

    return (
        <CurrentCupOptionsButton
            className={success && "success"}
            disabled={loading}
            onClick={clickSetOpenness}
        >
            {buttonText}
        </CurrentCupOptionsButton>
    );
};

export default CurrentCupOpennessButton;
