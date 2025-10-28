import { NextResponse } from "next/server";

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

    // Log the signup data for debugging
    console.log("New waitlist signup:", {
      email,
      name: name || null,
      source: source || "unknown",
      type: type || "waitlist",
      youtubeChannel: youtubeChannel || null,
      timestamp: new Date().toISOString(),
    });

    // Send data to Google Apps Script
    try {
      const appsScriptUrl =
        process.env.APPS_SCRIPT_WEB_APP_URL ||
        "https://script.google.com/macros/s/AKfycbzOFLrD9xqzXKM0ULjesBI9XOUp3R6ImgQnduRJhkDMAzu3KOD873_oQa-iSpu_1dxXyw/exec";

      const formBody = new URLSearchParams({
        // The Apps Script expects `e.parameter.Email`
        Email: email,
        YoutubeChannel: youtubeChannel || "", // Always send, even if empty
      });

      const appsScriptResponse = await fetch(appsScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });
      const text = await appsScriptResponse.text();
      console.log("Apps Script status:", appsScriptResponse.status);
      console.log("Apps Script response:", text);

      // Treat non-OK status or HTML error payloads as upstream failures
      const looksLikeHtmlError =
        typeof text === "string" && /<title>Error<\/title>|Error:/i.test(text);
      if (!appsScriptResponse.ok || looksLikeHtmlError) {
        return NextResponse.json(
          {
            error: "Apps Script error",
            status: appsScriptResponse.status,
            response: text,
          },
          { status: 502 }
        );
      }
    } catch (appsScriptError) {
      console.error("Error sending to Google Apps Script:", appsScriptError);
    }

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist!",
    });
  } catch (error) {
    console.error("Error processing waitlist signup:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
