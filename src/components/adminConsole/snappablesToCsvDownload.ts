export default function snappablesToCsvDownload(
    snappables,
    filename = "snappable_list.csv"
) {
    let csvContent = "id,fullName,email,username";
    snappables.forEach(({ id, fullName, email, username }) => {
        csvContent += `\n${id},${fullName},${email},${username}`;
    });

    var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
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
}
