import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function GET() {
  try {
    // Launch headless browser
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Set a real browser-like User-Agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    );

    // Go to the URL and wait until network idle
    await page.goto(
      "https://follopay.free.nf/api/deactivate-posts.php?key=my-secret-key-1234",
      { waitUntil: "networkidle2" }
    );

    // Extract clean text from body
    const content = await page.evaluate(() => document.body.innerText);

    await browser.close();

    // Return JSON
    return NextResponse.json({
      success: true,
      message: "Executed like real browser",
      data: content,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}