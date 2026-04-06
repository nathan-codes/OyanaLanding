import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const YOUTUBE_URL_REGEX =
  /^https?:\/\/(www\.)?youtube\.com\/(@[\w.-]+|channel\/[\w-]+|c\/[\w.-]+|user\/[\w.-]+)(\/.*)?$/i;

export async function POST(req: NextRequest) {
  try {
    const { email, country, youtubeUrl } = await req.json();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    if (!country || typeof country !== "string" || country.trim().length < 2) {
      return NextResponse.json(
        { error: "Invalid country" },
        { status: 400 }
      );
    }
    if (!youtubeUrl || !YOUTUBE_URL_REGEX.test(youtubeUrl)) {
      return NextResponse.json(
        { error: "Invalid YouTube channel URL" },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const payload = JSON.stringify({
      email: email.trim().toLowerCase(),
      country: country.trim(),
      youtubeUrl: youtubeUrl.trim(),
    });

    // Google Apps Script responds with a 302 redirect. Using text/plain
    // avoids preflight issues and the redirect is followed automatically.
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: payload,
      redirect: "follow",
    });

    // Google Apps Script redirects resolve to a 200 from
    // script.googleusercontent.com — any non-2xx is a real failure.
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(
        `Google Script error: ${response.status} ${response.statusText}`,
        text.slice(0, 500)
      );
      throw new Error(`Google Script responded with ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit invite error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
