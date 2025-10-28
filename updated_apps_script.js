// Updated Google Apps Script Code - CORRECTED VERSION
// Paste this into your Google Apps Script editor

function doPost(e) {
  try {
    var email = e && e.parameter && e.parameter.Email ? e.parameter.Email : "";
    if (!email) return ContentService.createTextOutput("Missing Email");

    var ss = SpreadsheetApp.openById(
      "1pe6PaP6kSqAl6WrLnEgxpKv4zzFApkC2gQrTdoNzODw"
    );
    var sheet = ss.getSheetByName("Sheet1");

    // Get the YouTube channel (if provided)
    var youtubeChannel =
      e && e.parameter && e.parameter.YoutubeChannel
        ? e.parameter.YoutubeChannel
        : "";

    // Check if this is just an update (YouTube channel submission)
    var isUpdateOnly = e && e.parameter && e.parameter.UpdateOnly === "true";

    // Debug logging
    console.log("Received:", {
      email: email,
      youtubeChannel: youtubeChannel,
      isUpdateOnly: isUpdateOnly,
    });

    if (isUpdateOnly && youtubeChannel) {
      // This is a YouTube channel update - find the last row with this email and update it
      var data = sheet.getDataRange().getValues();
      var foundRow = false;

      // Search from bottom to top to find the most recent entry
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i][0] === email) {
          // Check if email matches (Column A)
          // Update row (indices are 0-based, so i+1 is the actual row number)
          sheet.getRange(i + 1, 3).setValue(youtubeChannel); // Column C is index 3
          foundRow = true;
          console.log(
            "Updated row:",
            i + 1,
            "with YouTube channel:",
            youtubeChannel
          );
          break;
        }
      }

      if (!foundRow) {
        // If email not found, just append as new row
        sheet.appendRow([email, new Date(), youtubeChannel]);
        console.log("Could not find row, appended new one");
      }
    } else {
      // Normal signup - just append email and timestamp with empty YouTube channel
      sheet.appendRow([email, new Date(), ""]);
      console.log("Normal signup - appended row with empty YouTube channel");
    }

    return ContentService.createTextOutput("OK");
  } catch (err) {
    console.log("Error:", err);
    return ContentService.createTextOutput("Error: " + err);
  }
}
