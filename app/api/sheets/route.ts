import { NextResponse } from "next/server";
import { google } from "googleapis";

// Initialize Google Sheets API
const sheets = google.sheets({ version: "v4" });

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, name, source, type, youtubeChannel } = data;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Authenticate with Google Sheets API using service account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Get the spreadsheet ID from environment variable
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error("Google Sheet ID not configured");
    }

    // Prepare the data to append
    const values = [
      [
        new Date().toISOString(), // Timestamp
        email,
        name || "", // Name (empty if not provided)
        source || "unknown",
        type || "waitlist",
        youtubeChannel || "", // YouTube channel (empty if not provided)
      ],
    ];

    // Append data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F", // Range includes: Timestamp, Email, Name, Source, Type, YouTube Channel
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log("Data appended to Google Sheets:", response.data);

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist!",
    });
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
