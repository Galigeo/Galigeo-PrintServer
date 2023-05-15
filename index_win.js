const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const axios = require("axios");
app.use(cookieParser());


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
    headless: 'new'
  });
  console.log('start call');
  const url = decodeURIComponent(req.query.url);
  const width = req.query.width;
  const height = req.query.height;
  const page = await browser.newPage();
  // to add cookie
  console.log(url);
  const cookies = req.cookies;
  const objCoos = cookieParser.JSONCookies(cookies);
  let token = objCoos.GaligeoToken;
  console.log(token);
  const cos = [
    {
      name: "GaligeoToken",
      value: token,
      domain: "ggobo42sp7",
      path: "/",
    },
  ];
  await page.setCookie(...cos);


  await page.setViewport({ width: 1080, height: 1024 });
  console.log('setViewport');
  await page.goto(
    url,
    {
      waitUntil: "networkidle0",
    }
  );
  console.log('waitForResponse');
  const first = Date.now();
  let imgIsCached = false;
  await page.waitForResponse(
    async (response) => {
      //console.log(response.url());
      if ((first + 5000) < Date.now()) {
        console.log('force exit afer 40000 ms');
        return true;
      }
      if (response.url().includes("cache")) {
        imgIsCached = true;
      }
      return response.url().includes("cache");
    },
    { timeout: 0 }
  );


  // Set screen size
  console.log('close');
  await browser.close();
  res.set({ "Content-Type": "application/json" });
  if (imgIsCached) {
    res.send({ message: "Image is in cache folder" });
  } else {
    res.send({ message: "time out" });
  }
  //res.send({ message: "Image is in cache folder" });

});

app.listen(port, () => {
  console.log("Server app listening on port " + port);
});
