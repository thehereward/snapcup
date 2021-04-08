import MentionElements from "../../types/MentionElements";
import Snap from "../../types/Snap";
import ValidateSnap from "./ValidateSnap";

describe("ValidateSnap", () => {
    const elem1: MentionElements = {
        id: "RandomUNiqueID1",
        display: "Jimathy",
    };
    const emptyMentions: MentionElements[] = [];
    const someMentions: MentionElements[] = [elem1];
    const message1: String = "Hello mate, how are you?";
    const message2: String = "Hello @(Jimathy)[RandomUNiqueID1], you are cool";
    test("test for unsuccessful attempt at submission of an illegitimate snap", () => {
        const invalidSnap1: Snap = {
            body: message1,
            to: undefined,
            from: "Timathy",
            timestamp: new Date(),
        };
        const invalidSnap2: Snap = {
            body: message2,
            to: ["RandomUNiqueID1"],
            from: undefined,
            timestamp: new Date(),
        };
        expect(ValidateSnap(invalidSnap1, emptyMentions)).toBeFalsy();
        expect(ValidateSnap(invalidSnap2, someMentions)).toBeFalsy();
    });
    test("test for successful submission of a legitimate snap", () => {
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
        expect(ValidateSnap(validSnap1, emptyMentions)).toBeTruthy();
        expect(ValidateSnap(validSnap2, someMentions)).toBeTruthy();
    });
});
