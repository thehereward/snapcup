import React from "react";
import renderer from "react-test-renderer";
import MentionElements from "../../types/MentionElements";
import CharactersLeftDisplay from "./CharactersLeftDisplay";

describe("CharactersLeftDisplay", () => {
    const elem1: MentionElements = { id: "idlength10", display: "Jim" };
    const elem2: MentionElements = {
        id: "anna@softwire.com",
        display: "Anna",
    };
    const msg1: String = "";
    const msg2: String =
        "Hi there @[Anna](anna@softwire.com) and @[Jim](idlength10), you have cool voices!";
    test("characters remaining string renders on typical message", () => {
        const component = renderer.create(
            <CharactersLeftDisplay
                snappedUsers={[elem1, elem2]}
                message={msg2}
            />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("characters remaining string renders on empty message", () => {
        const component = renderer.create(
            <CharactersLeftDisplay snappedUsers={[]} message={msg1} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
