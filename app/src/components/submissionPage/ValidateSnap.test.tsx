import { MentionElements, Snap } from "../../types";
import validateSnap from "./ValidateSnap";

describe("validateSnap", () => {
    const elem1: MentionElements = {
        id: "RandomUNiqueID1",
        display: "Jimathy",
    };
    const emptyMentions: MentionElements[] = [];
    const someMentions: MentionElements[] = [elem1];
    const message1: string = "Hello mate, how are you?";
    const message2: string = "Hello @(Jimathy)[RandomUNiqueID1], you are cool";
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
        expect(validateSnap(invalidSnap1, emptyMentions)).toBeFalsy();
        expect(validateSnap(invalidSnap2, someMentions)).toBeFalsy();
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
        expect(validateSnap(validSnap1, emptyMentions)).toBeTruthy();
        expect(validateSnap(validSnap2, someMentions)).toBeTruthy();
    });
});
