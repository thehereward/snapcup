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

export async function readFileAndUpload(file: Blob) {
    const fileText = await file.text();
    const snappableList = [];
    fileText
        .trim()
        .split("\n")
        .forEach((line, i) => {
            if (i === 0) {
                // Skip first line (headings)
                return;
            }

            const [id, fullName, email, username] = line.split(",");
            if (fullName && email && username) {
                snappableList.push({
                    id,
                    fullName,
                    email,
                    username,
                });
            } else {
                throw new Error(
                    "All people in the spreadsheet must have name and email and username"
                );
            }
        });
    const result = await firebase
        .functions()
        .httpsCallable("uploadSnappableList")(snappableList);
    console.log(result);
}
