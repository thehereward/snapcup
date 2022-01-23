import React, { useState } from "react";
import { setCupOpenness } from "../../../firebase/cups/CupService";
import { Cup, Entity } from "../../../types";

const CurrentCupOpennessButton = (props: { cup: Entity<Cup> }) => {
    const cup = props.cup;
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
        <button
            className={`button-secondary pops ${success && "success"}`}
            disabled={loading}
            onClick={clickSetOpenness}
        >
            {buttonText}
        </button>
    );
};

export default CurrentCupOpennessButton;
