import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");
    const lang = searchParams.get("lang") || "gu";

    if (!text) {
      return new NextResponse("Text parameter is required", { status: 400 });
    }

    // Google Translate TTS endpoint with proper User-Agent to avoid client blocks
    const encodedText = encodeURIComponent(text.slice(0, 200));
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${encodeURIComponent(
      lang
    )}&client=tw-ob`;

    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/"
      }
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch audio stream from TTS provider", {
        status: response.status
      });
    }

    const audioArrayBuffer = await response.arrayBuffer();

    return new NextResponse(audioArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, immutable"
      }
    });
  } catch (error) {
    console.error("TTS API Error:", error);
    return new NextResponse("Internal Server Error generating speech audio", { status: 500 });
  }
}
