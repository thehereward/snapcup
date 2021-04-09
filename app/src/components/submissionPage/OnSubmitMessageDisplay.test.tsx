import React from "react";
import { render as librender } from "@testing-library/react";
import { screen } from "@testing-library/react";
import OnSubmitMessageDisplay from "./OnSubmitMessageDisplay";
import each from "jest-each";
import { act } from "react-dom/test-utils";

describe("OnSubmitMessageDisplay", () => {
    each([
        [true, 1],
        [false, 0],
    ]).test(
        "Submit message appears if confirmation is %s",
        (confirmation, matches) => {
            act(() => {
                librender(
                    <OnSubmitMessageDisplay confirmation={confirmation} />
                );
            });
            const text = screen.queryAllByText("Snap submitted!");
            expect(text.length).toBe(matches);
        }
    );
});
