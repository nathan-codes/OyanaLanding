import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // For now, just log the data
    console.log("Received pre-order data:", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing pre-order:", error);
    return NextResponse.json(
      { error: "Failed to process pre-order" },
      { status: 500 }
    );
  }
}
