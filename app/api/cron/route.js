import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(
      "https://follopay.free.nf/api/deactivate-posts.php?key=my-secret-key-1234",
      {
        waitUntil: "networkidle2",
      }
    );

    const content = await page.content();

    await browser.close();

    return NextResponse.json({
      success: true,
      message: "Executed like real browser",
      data: content,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}