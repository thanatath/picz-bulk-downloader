const puppeteer = require("puppeteer");

const scrapeImages = require("./scrape-images");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter a URL to scrape images from: ", (url) => {
  process.stdout.write("\x1Bc");
  (async () => {
    console.log("Scraping images from", url);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    await page.waitForNavigation();
    const imgTags = await page.$$eval("img", (imgs) =>
      imgs.map((img) => img.outerHTML)
    );

    scrapeImages(imgTags);
    await browser.close();
  })();

  readline.close();
});
