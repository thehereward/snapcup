import firebase from "firebase/app";
import "firebase/functions";

function snappablesToCsvContent(snappables) {
    let csvContent = "id,fullName,email,username";
    snappables.forEach(({ id, fullName, email, username }) => {
        csvContent += `\n${id},${fullName},${email},${username}`;
    });
    return csvContent;
}

function stringToFileDownload(
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

export function snappablesToCsvDownload(
    snappables,
    filename = "snappable_list.csv"
) {
    const csvContent = snappablesToCsvContent(snappables);
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
