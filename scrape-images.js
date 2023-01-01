const fs = require("fs");
const https = require("https");
const path = require("path");

function scrapeImages(imgTags) {
  const srcValues = imgTags
    .map((img) => {
      const srcRegex = /src="(.+?)"/;
      const srcMatch = img.match(srcRegex);
      if (srcMatch) {
        return srcMatch[1];
      }
    })
    .filter((src) => src);

  srcValues.shift();

  const cleanedSrcValues = srcValues.map((src) => src.replace(/.md/, ""));

  cleanedSrcValues.forEach((url, index) => {
    console.log("Downloading image at ", url);
    const subfolderPath = path.join(__dirname, "Downloaded/");
    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath);
    }
    https.get(url, (response) => {
      filename = `image-${index}.jpg`;
      response.pipe(fs.createWriteStream(subfolderPath + filename));
    });
  });
}

module.exports = scrapeImages;
