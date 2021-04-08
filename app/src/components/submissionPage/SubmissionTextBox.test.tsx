import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SubmissionTextBox from "./SubmissionTextBox";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders without crashing", () => {
    act(() => {
        render(
            <SubmissionTextBox
                snappables={[{ id: "test-id", display: "test-display" }]}
                user={"test-user"}
            />,
            container
        );
    });
    expect(container.children.length).toBeGreaterThan(0);
});
