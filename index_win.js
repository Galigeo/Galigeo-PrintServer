const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/puppeteer", async (req, res) => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--hide-scrollbars",
      "--disable-web-security",
    ],
    headless: true
  });
  const url = decodeURIComponent(req.query.url);
  const width = req.query.width;
  const height = req.query.height;
  const page = await browser.newPage();
  // to add cookie
  /*const cos = [
    {
      name: "GaligeoToken",
      value: req.params.token,
      domain: "localhost",
      path: "/Galigeo/",
    },
  ];
  await page.setCookie(...cos);*/
  await page.setViewport({ width: width ? width : 1080, height: height ? height : 1024 });
  await page.goto(
    url,
    {
      waitUntil: "networkidle0",
    }
  );
  await page.waitForResponse(
    async (response) => {
      console.log(response.url());
      return response.url().includes("cache");
    },
    { timeout: 0 }
  );

  // Set screen size
  
  await browser.close();
  res.set({ "Content-Type": "application/json" });
  res.send({ message: "Image is in cache folder" });
});

app.listen(port, () => {
  console.log("Server app listening on port " + port);
});
