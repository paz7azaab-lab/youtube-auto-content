const { chromium } = require("playwright");

async function main() {
  const context = await chromium.launchPersistentContext("./data/youtube-session", {
    headless: true
  });
  const pages = context.pages();
  const page = pages[0] || await context.newPage();
  await page.goto("https://studio.youtube.com/", { waitUntil: "domcontentloaded" });
  console.log(JSON.stringify({
    url: page.url(),
    title: await page.title(),
    authenticated: !page.url().includes("accounts.google.com")
  }, null, 2));
  await context.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
