const { chromium } = require("playwright");

async function withStudio(fn) {
  const context = await chromium.launchPersistentContext("./data/youtube-session", {
    headless: process.env.HEADLESS !== "false"
  });
  try {
    const page = context.pages()[0] || await context.newPage();
    await page.goto("https://studio.youtube.com/", { waitUntil: "domcontentloaded" });
    if (page.url().includes("accounts.google.com")) throw new Error("GOOGLE_LOGIN_REQUIRED");
    return await fn(page);
  } finally {
    await context.close();
  }
}

async function status() {
  return withStudio(async page => ({
    ok: true,
    studioUrl: page.url(),
    title: await page.title()
  }));
}

async function openChannelSetup() {
  const context = await chromium.launchPersistentContext("./data/youtube-session", {
    headless: false
  });
  const page = context.pages()[0] || await context.newPage();
  await page.goto("https://www.youtube.com/create_channel", { waitUntil: "domcontentloaded" });
  return {
    ok: true,
    url: page.url(),
    message: "Complete any Google/YouTube identity, CAPTCHA, phone verification, or other security step yourself if requested. Do not share passwords with the agent."
  };
}

module.exports = { withStudio, status, openChannelSetup };
