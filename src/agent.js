const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launchPersistentContext("./data/youtube-session", {
    headless: process.env.HEADLESS !== "false"
  });
  const page = await browser.newPage();
  await page.goto("https://studio.youtube.com/", { waitUntil: "domcontentloaded" });
  console.log("YouTube Agent is running.");
  console.log("Session path: ./data/youtube-session");
  console.log("Keep this process running for autonomous browser control.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
