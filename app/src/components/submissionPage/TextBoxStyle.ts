export const TextBoxStyle = {
    control: {
        backgroundColor: "var(--white)",
        fontSize: 14,
        fontWeight: "normal",
        height: 250,
    },

    "&multiLine": {
        control: {
            fontFamily: "var(--open-sans)",
            minHeight: 63,
        },
        highlighter: {
            padding: 9,
            border: "1px solid transparent",
        },
        input: {
            padding: 9,
            border: "1px solid silver",
        },
    },

    "&singleLine": {
        display: "inline-block",
        width: 180,

        highlighter: {
            padding: 1,
            border: "2px inset transparent",
        },
        input: {
            padding: 1,
            border: "2px inset",
        },
    },

    suggestions: {
        list: {
            color: "var(--text-normal)",
            fontSize: 14,
            backgroundColor: "var(--purple)",
            overflow: "auto",
            maxHeight: 200,
        },
        item: {
            padding: "5px 15px",
            "&focused": {
                backgroundColor: "var(--light-purple)",
                fontWeight: 600,
            },
        },
    },
};
