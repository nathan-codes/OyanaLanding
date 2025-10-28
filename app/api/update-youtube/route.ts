import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, youtubeChannel } = data;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Don't do anything if no YouTube channel
    if (!youtubeChannel || !youtubeChannel.trim()) {
      return NextResponse.json({
        success: true,
        message: "No YouTube channel to update",
      });
    }

    // Log the update
    console.log("Updating YouTube channel:", {
      email,
      youtubeChannel,
      timestamp: new Date().toISOString(),
    });

    // Send update to Google Apps Script
    try {
      const appsScriptUrl =
        process.env.APPS_SCRIPT_WEB_APP_URL ||
        "https://script.google.com/macros/s/AKfycbzOFLrD9xqzXKM0ULjesBI9XOUp3R6ImgQnduRJhkDMAzu3KOD873_oQa-iSpu_1dxXyw/exec";

      const formBody = new URLSearchParams({
        Email: email,
        YoutubeChannel: youtubeChannel,
        UpdateOnly: "true", // Flag to indicate this is just an update, not a new signup
      });

      const appsScriptResponse = await fetch(appsScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      const text = await appsScriptResponse.text();
      console.log("Apps Script update status:", appsScriptResponse.status);
      console.log("Apps Script update response:", text);

      return NextResponse.json({
        success: true,
        message: "Successfully updated YouTube channel!",
      });
    } catch (appsScriptError) {
      console.error("Error updating YouTube channel:", appsScriptError);
      // Still return success since this is optional
      return NextResponse.json({
        success: true,
        message: "Update received",
      });
    }
  } catch (error) {
    console.error("Error processing YouTube update:", error);
    return NextResponse.json(
      { error: "Failed to process update" },
      { status: 500 }
    );
  }
}
