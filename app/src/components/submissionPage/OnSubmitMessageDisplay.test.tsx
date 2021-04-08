import React from "react";
import { render as librender } from "@testing-library/react";
import { screen } from "@testing-library/react";
import OnSubmitMessageDisplay from "./OnSubmitMessageDisplay";

describe("OnSubmitMessageDisplay", () => {
    test("Submit message appears if confirmation is true", () => {
        librender(<OnSubmitMessageDisplay confirmation={true} />);
        screen.getByText("Snap submitted!");
    });
    test("Submit message is empty if confirmation is false", () => {
        librender(<OnSubmitMessageDisplay confirmation={false} />);
        const text = screen.queryByText("Snap submitted!");
        expect(text).toBe(null);
    });
});
