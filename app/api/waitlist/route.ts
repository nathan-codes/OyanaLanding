import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, name, source, type } = data;

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
      timestamp: new Date().toISOString(),
    });

    // Send data to Google Sheets
    try {
      const sheetsResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/sheets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            source,
            type,
          }),
        }
      );

      if (!sheetsResponse.ok) {
        console.error("Failed to write to Google Sheets");
        // Still return success to user, but log the error
      }
    } catch (sheetsError) {
      console.error("Error writing to Google Sheets:", sheetsError);
      // Still return success to user, but log the error
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
