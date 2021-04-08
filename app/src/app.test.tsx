import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AppWrap from "./appWrap";

jest.mock("./firebase/users/UserService");
jest.mock("./firebase/users/GetSnappables");
jest.mock("./firebase/InitializeDatabase");
jest.mock("./firebase/snaps/SnapService");

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
        render(<AppWrap />, container);
    });
    expect(container.children.length).toBeGreaterThan(0);
});
