import MentionElements from "../../types/MentionElements";
import GetExtraLength from "./GetExtraLength";

describe("<SubmissionTextBox />", () => {
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
    const emptyMentions: MentionElements[] = [];
    const allMentions: MentionElements[] = [elem1, elem2, elem3];
    test("test for character limit changes when tagged users changes", () => {
        /*  React Mentions includes metadata inside the value field making a tag like 
            @tom  -> @(tom)[uniqueID]
            This function should adjust the character count to ignore metadata.
        */
        expect(GetExtraLength(emptyMentions)).toBe(280);
        expect(GetExtraLength(allMentions)).toBe(
            280 + 3 * (elem1.id.length + 5)
        );
    });
});
