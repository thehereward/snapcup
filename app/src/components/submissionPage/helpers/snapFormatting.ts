export function formatTimestamp(date: Date): string {
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        minute: "2-digit",
        hour: "2-digit",
    });
}

export interface BodyElement {
    text: string;
    isTag: boolean;
}

export function getBodyElements(body: string): BodyElement[] {
    // The regex matches something of the form @[full name](username) with a capture group to capture the full name part
    const tagRegex = /@\[(.*?)\]\(.*?\)/g;
    let match;
    const bodyElements: BodyElement[] = [];
    let prevIndex = 0;
    while ((match = tagRegex.exec(body)) !== null) {
        if (prevIndex != match.index) {
            bodyElements.push({
                text: body.substring(prevIndex, match.index),
                isTag: false,
            });
        }
        // match[1] is the capture group
        bodyElements.push({ text: match[1], isTag: true });
        prevIndex = tagRegex.lastIndex;
    }
    if (prevIndex < body.length) {
        bodyElements.push({ text: body.substring(prevIndex), isTag: false });
    }
    return bodyElements;
}

/* Formats the body of a snap so the meta data is removed */
export function formatBody(body: string) {
    var newBody = "";
    const bodyElems = getBodyElements(body);
    for (var elem of bodyElems) {
        newBody += elem.text;
    }
    return newBody;
}
