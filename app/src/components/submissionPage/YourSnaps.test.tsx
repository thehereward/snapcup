import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { createMock } from "ts-auto-mock";
import { Cup, Entity } from "~types";

import YourSnaps from "./YourSnaps";

jest.mock("../../firebase/users/UserService");
jest.mock("../../firebase/InitializeDatabase");
jest.mock("../../firebase/snaps/SnapService");
jest.mock("../../firebase/users/GetSnappables");
jest.mock("../../images/TrashIcon");

const testCup = createMock<Entity<Cup>>();

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
        render(<YourSnaps cup={testCup} />, container);
    });
    expect(container.children.length).toBeGreaterThan(0);
});
