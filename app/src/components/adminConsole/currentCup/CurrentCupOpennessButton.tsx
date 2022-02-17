import React, { useState } from "react";
import { setCupOpenness } from "../../../firebase/cups/CupService";
import { Cup, Entity } from "../../../types";

const CurrentCupOpennessButton = (props: { cup: Entity<Cup> }) => {
    const cup = props.cup;
    const [loading, setLoading] = useState<boolean>(false);
    const inputId = `isCupOpen_${cup.id}`;

    const clickSetOpenness = async () => {
        try {
            setLoading(true);
            await setCupOpenness(cup.id, !cup.isOpen);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                disabled={loading}
                checked={cup.isOpen}
                onChange={clickSetOpenness}
                id={inputId}
                type="checkbox"
            />
            <label className="form-check-label" htmlFor={inputId}>
                Is open?
            </label>
        </div>
    );
};

export default CurrentCupOpennessButton;
