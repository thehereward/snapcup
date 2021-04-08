import React from "react";
import { render as librender } from "@testing-library/react";
import { screen } from "@testing-library/react";
import SubmissionBoxErrorDisplay from "./SubmissionBoxErrorDisplay";

describe("SubmissionBoxErrorDisplay", () => {
    test("test for appearance of error message on error", () => {
        librender(<SubmissionBoxErrorDisplay error={"error"} />);
        screen.getByText("error");
        const text = screen.queryAllByText(/./);
        expect(text.length).toBeGreaterThan(0);
    });
    test("test for no error message if no error", () => {
        librender(<SubmissionBoxErrorDisplay error={""} />);
        const text = screen.queryAllByText(/./);
        expect(text.length).toBe(0);
    });
});
