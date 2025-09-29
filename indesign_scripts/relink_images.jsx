(function () {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;

    // Ask user to choose the new folder for links
    var newFolder = Folder.selectDialog("Select the folder containing the new PNGs");

    if (!newFolder) {
        alert("No folder selected. Script cancelled.");
        return;
    }

    var links = doc.links;
    var relinkCount = 0;
    var missingCount = 0;

    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var fileName = link.name; // only the file name (e.g. image.png)
        
        if (fileName.toLowerCase().indexOf(".png") !== -1) {
            var newFile = File(newFolder.fsName + "/" + fileName);

            if (newFile.exists) {
                try {
                    link.relink(newFile);
                    link.update();
                    relinkCount++;
                } catch (e) {
                    $.writeln("Error relinking " + fileName + ": " + e);
                }
            } else {
                missingCount++;
                $.writeln("File not found in folder: " + fileName);
            }
        }
    }

    alert("Relinking complete!\n\nRelinked: " + relinkCount + "\nMissing: " + missingCount);
})();
