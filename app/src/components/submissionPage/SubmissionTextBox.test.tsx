import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SubmissionTextBox from "./SubmissionTextBox";

function mockUseSnappablePeople() {
    return [[]];
}

jest.mock("../../firebase/hooks/UseSnappablePeopleHook", () => ({
    __esModule: true,
    useSnappablePeople: mockUseSnappablePeople,
}));

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
                cup={{
                    id: "test-id",
                    isPublished: false,
                    isOpen: false,
                    name: "test-name",
                    timeCreated: new Date(),
                }}
                user={"test-user"}
            />,
            container
        );
    });
    expect(container.children.length).toBeGreaterThan(0);
});
