// SubmissionTextBox.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import { render as librender } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MentionElements from "../../types/MentionElements";
import SubmissionTextBox, { Props } from "./SubmissionTextBox";
import GetExtraLength from "./GetExtraLength";
import CharactersLeftDisplay, {
    GetCharacterCountRemaining,
} from "./CharactersLeftDisplay";
import OnSubmitMessageDisplay from "./OnSubmitMessageDisplay";
import Snap from "../../firebase/snap/Snap";
import ValidateSnap from "./ValidateSnap";
import SubmissionBoxErrorDisplay from "./SubmissionBoxErrorDisplay";

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

describe("CharactersLeftDisplay", () => {
    test("characters remaining string renders", () => {
        const elem1: MentionElements = { id: "idlength10", display: "Jim" };
        const elem2: MentionElements = {
            id: "anna@softwire.com",
            display: "Anna",
        };
        const msg2: String =
            "Hi there @[Anna](anna@softwire.com) and @[Jim](idlength10), you have cool voices!";
        const component = renderer.create(
            <CharactersLeftDisplay
                snappedUsers={[elem1, elem2]}
                message={msg2}
            />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("characters remaining string renders", () => {
        const elem1: MentionElements = { id: "idlength10", display: "Jim" };
        const elem2: MentionElements = {
            id: "anna@softwire.com",
            display: "Anna",
        };
        const msg1: String = "";
        const component = renderer.create(
            <CharactersLeftDisplay snappedUsers={[]} message={msg1} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

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

/*  */
describe("<SubmissionTextBox />", () => {
    test("test for successful submission of a legitimate snap", () => {
        /*  Ensure that snaps are legitimate before firebase submission */
        const elem1: MentionElements = {
            id: "RandomUNiqueID1",
            display: "Jimathy",
        };
        const emptyMentions: MentionElements[] = [];
        const someMentions: MentionElements[] = [elem1];
        const message1: String = "Hello mate, how are you?";
        const message2: String =
            "Hello @(Jimathy)[RandomUNiqueID1], you are cool";
        const validSnap1: Snap = {
            body: message1,
            to: [],
            from: "Timathy",
            timestamp: new Date(),
        };
        const validSnap2: Snap = {
            body: message2,
            to: ["RandomUNiqueID1"],
            from: "Timathy",
            timestamp: new Date(),
        };
        //expect(ValidateSnap(validSnap1, emptyMentions)).toBe(true)
        expect(ValidateSnap(validSnap2, someMentions)).toBe(true);
    });
    test("test for character count changes on type and appearance of characters left", () => {
        /*  As you type in the character count changes
            "Helloooo" -> chacter coutner = 272
            "Hello @user" -> character counter = 269
        */

        const elem1: MentionElements = {
            id: "RandomUNiqueID1",
            display: "Jimathy",
        };
        const emptyMentions: MentionElements[] = [];
        const someMentions: MentionElements[] = [elem1];
        const message1: String = "Hello mate, how are you?";
        const message2: String =
            "Hello @(Jimathy)[RandomUNiqueID1], you are cool";
        expect(GetCharacterCountRemaining(message1, emptyMentions)).toBe(
            280 - message1.length
        );
        expect(GetCharacterCountRemaining(message2, someMentions)).toBe(
            280 - message2.length + "@()[]".length + elem1.id.length
        );
    });

    test("test for character limit changes when tagged users changes", () => {
        /*  React Mentions includes metadata inside the value field making a tag like 
            @tom  -> @(tom)[uniqueID]
            This function should adjust the character count to ignore metadata.
        */
        const emptyMentions: MentionElements[] = [];
        const elem1: MentionElements = {
            id: "RandomUNiqueID1",
            display: "Jimathy",
        };
        const elem2: MentionElements = {
            id: "RandomUNiqueID2",
            display: "Jonathy",
        };
        const elem3: MentionElements = {
            id: "RandomUNiqueID2",
            display: "Jenathy",
        };
        const someMentions: MentionElements[] = [elem1, elem2, elem3];
        expect(GetExtraLength(emptyMentions)).toBe(280);
        expect(GetExtraLength(someMentions)).toBe(
            280 + 3 * (elem1.id.length + 5)
        );
    });
});
