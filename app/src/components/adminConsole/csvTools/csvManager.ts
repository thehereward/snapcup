import firebase from "firebase/app";
import "firebase/functions";
import FileUploadError from "../FileUploadError";

function assertSnappableRecordValid(fullName, email, username, i = null) {
    if (!(fullName && email && username)) {
        throw new FileUploadError(
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

export async function readFileAndUpload(cupId: string, file: Blob) {
    const csvText = await file.text();
    const snappableList = csvTextToSnappableList(csvText);

    const requestObject = {
        cupId: cupId,
        snappablePeople: snappableList,
    };

    return firebase
        .app()
        .functions("europe-west2")
        .httpsCallable("uploadSnappableList")(requestObject);
}
