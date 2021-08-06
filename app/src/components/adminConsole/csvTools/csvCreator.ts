import "firebase/functions";
import stringify from "csv-stringify/lib/sync";
import { formatBody } from "../../submissionPage/helpers/snapFormatting";
import { Snappable, Snap } from "~types";

function snappablesToCsvContent(snappables: Snappable[]) {
    return stringify(snappables, { header: true });
}

function snapsToCsvContent(snaps: Snap[]) {
    var convertedSnaps = snaps.map((snap) => {
        return {
            message: formatBody(snap.body),
        };
    });
    return stringify(convertedSnaps, { header: true });
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

export function snapsToCsvDownload(snaps) {
    const csvContent = snapsToCsvContent(snaps);
    stringToFileDownload(csvContent, "snaps.csv", "text/csv;charset=utf-8;");
}

export function snappablesToCsvDownload(snappables: Snappable[]) {
    const csvContent = snappablesToCsvContent(snappables);
    stringToFileDownload(
        csvContent,
        "snappable_list.csv",
        "text/csv;charset=utf-8;"
    );
}
