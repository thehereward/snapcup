import { getBodyElements } from "./snapFormatting";

test("Extracts tag from text", () => {
    expect(getBodyElements("Hi @[some name](somemoretext)")).toMatchObject([
        {
            text: "Hi ",
            isTag: false,
        },
        {
            text: "some name",
            isTag: true,
        },
    ]);
});

test("Extracts tag from text without spaces around", () => {
    expect(
        getBodyElements("Hi@[some name](somemoretext)evenmore text")
    ).toMatchObject([
        {
            text: "Hi",
            isTag: false,
        },
        {
            text: "some name",
            isTag: true,
        },
        {
            text: "evenmore text",
            isTag: false,
        },
    ]);
});

test("Extracts multiple tags", () => {
    expect(
        getBodyElements(
            "Hello @[some name](somemoretext) even more text @[some name 2](somemoretext)"
        )
    ).toMatchObject([
        {
            text: "Hello ",
            isTag: false,
        },
        {
            text: "some name",
            isTag: true,
        },
        {
            text: " even more text ",
            isTag: false,
        },
        {
            text: "some name 2",
            isTag: true,
        },
    ]);
});

test("Works if there are no tags", () => {
    expect(getBodyElements("Just some text without tags")).toMatchObject([
        {
            text: "Just some text without tags",
            isTag: false,
        },
    ]);
});
