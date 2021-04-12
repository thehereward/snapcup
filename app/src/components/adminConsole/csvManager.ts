import firebase from "firebase/app";
import "firebase/functions";
import {
    getBodyElements,
    BodyElement,
} from "../../components/submissionPage/helpers/snapFormatting";

export function snappablesToCsvContent(snappables) {
    let csvContent = "id,fullName,email,username";
    snappables.forEach(({ id, fullName, email, username }) => {
        csvContent += `\n${id},${fullName},${email},${username}`;
    });
    return csvContent;
}

/* Formats the body of a snap so the meta data is removed */
function formatBody(body: string) {
    var newBody = "";
    const bodyElems = getBodyElements(body);
    for (var elem of bodyElems) {
        newBody += elem.text;
    }
    return newBody;
}

export function snapsToCsvContent(snappables) {
    let csvContent = "messages";
    snappables.forEach(({ to, from, body, timestamp }) => {
        csvContent += `\n${formatBody(body)}`;
    });
    return csvContent;
}
export function stringToFileDownload(
    content: string,
    filename: string,
    type = "text/csv;charset=utf-8;"
) {
    var blob = new Blob([content], { type });
    var link = document.createElement("a");
    if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export function csvContentToCsvDownload(
    csvContent,
    filename = "snappable_list.csv"
) {
    stringToFileDownload(csvContent, filename, "text/csv;charset=utf-8;");
}

function assertSnappableRecordValid(fullName, email, username, i = null) {
    if (!(fullName && email && username)) {
        throw new Error(
            "All people in the spreadsheet must have name and email and username. " +
                `Error at line ${i}. Fields at present are fullName=${fullName}, email=${email}, username=${username}.`
        );
    }
}

function csvTextToSnappableList(csvText) {
    const snappableList = [];
    csvText
        .trim()
        .split("\n")
        .forEach((line, i) => {
            if (i === 0) {
                // Skip first line (headings)
                return;
            }

            const [id, fullName, email, username] = line.split(",");
            assertSnappableRecordValid(fullName, email, username, i);
            snappableList.push({
                id,
                fullName,
                email,
                username,
            });
        });
    return snappableList;
}

export async function readFileAndUpload(file: Blob) {
    const csvText = await file.text();
    const snappableList = csvTextToSnappableList(csvText);

    return firebase.functions().httpsCallable("uploadSnappableList")(
        snappableList
    );
}
