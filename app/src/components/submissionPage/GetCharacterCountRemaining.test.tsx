import { MentionElements } from "../../types";
import { GetCharacterCountRemaining } from "./CharactersLeftDisplay";

describe("<SubmissionTextBox />", () => {
    const elem1: MentionElements = {
        id: "RandomUNiqueID1",
        display: "Jimathy",
    };
    const emptyMentions: MentionElements[] = [];
    const someMentions: MentionElements[] = [elem1];
    const message1: string = "Hello mate, how are you?";
    const message2: string = "Hello @(Jimathy)[RandomUNiqueID1], you are cool";
    test("test for character count changes on type and appearance of characters left", () => {
        expect(GetCharacterCountRemaining(message1, emptyMentions)).toBe(
            280 - message1.length
        );
        expect(GetCharacterCountRemaining(message2, someMentions)).toBe(
            280 - message2.length + "@[]()".length + elem1.id.length
        );
    });
});
