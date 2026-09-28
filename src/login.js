const { chromium } = require("playwright");

async function main() {
  const context = await chromium.launchPersistentContext("./data/youtube-session", {
    headless: false
  });
  const page = await context.newPage();
  await page.goto("https://studio.youtube.com/", { waitUntil: "domcontentloaded" });
  console.log("Sign in to the Google account that owns the YouTube channel.");
  console.log("After login, keep the browser open until the session is established.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
