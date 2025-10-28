// Simple Apps Script - CORRECT VERSION
// Copy this entire function into your Google Apps Script

function doPost(e) {
  try {
    var email = e && e.parameter && e.parameter.Email ? e.parameter.Email : "";
    if (!email) return ContentService.createTextOutput("Missing Email");

    var ss = SpreadsheetApp.openById(
      "1pe6PaP6kSqAl6WrLnEgxpKv4zzFApkC2gQrTdoNzODw"
    );
    var sheet = ss.getSheetByName("Sheet1");

    // Get YouTube channel (if provided)
    var youtubeChannel =
      e && e.parameter && e.parameter.YoutubeChannel
        ? e.parameter.YoutubeChannel
        : "";

    // Check if this is an update
    var isUpdate = e && e.parameter && e.parameter.UpdateOnly === "true";

    if (isUpdate && youtubeChannel) {
      // Update mode: find the last row with this email and update column 3
      var data = sheet.getDataRange().getValues();

      // Search from bottom to top
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i][0] === email) {
          // Found it! Update column 3 (YouTube channel)
          sheet.getRange(i + 1, 3).setValue(youtubeChannel);
          return ContentService.createTextOutput("Updated");
        }
      }

      // Not found, create new row
      sheet.appendRow([email, new Date(), youtubeChannel]);
      return ContentService.createTextOutput("OK");
    } else {
      // Normal signup - create row with empty YouTube channel
      sheet.appendRow([email, new Date(), ""]);
      return ContentService.createTextOutput("OK");
    }
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err);
  }
}
