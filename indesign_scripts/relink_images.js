(function () {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;
    
    var newFolder = Folder.selectDialog("Select the folder containing the new PNGs");

    if (!newFolder) {
        alert("No folder selected. Script cancelled.");
        return;
    }

    var links = doc.links;
    var relinkCount = 0;
    var missingFiles = [];

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
                missingFiles.push(fileName);
            }
        }
    }

    var message = "Relinking complete!\n\nRelinked: " + relinkCount;

    if (missingFiles.length > 0) {
        message += "\n\nMissing files (" + missingFiles.length + "):\n- " + missingFiles.join("\n- ");
    }

    alert(message);
})();
