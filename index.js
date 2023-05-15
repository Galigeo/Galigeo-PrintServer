const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
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
    headless: 'new',
    executablePath: '/usr/bin/google-chrome'
  });
  const urlLogin: string = req.query.url;
  axios.get(url, {
    headers: {
      Cookie: "GaligeoToken=" + req.cookies["GaligeoToken"],
    },
  })
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });
  const url = decodeURI(req.query.link);
  console.log(url);
  const width = req.query.width;
  const height = req.query.height;
  const page = await browser.newPage();
  const cookies = req.cookies;
  const objCoos = cookieParser.JSONCookies(cookies);
  console.log(objCoos.GaligeoToken);
  const cos = [
    {
      name: "GaligeoToken",
      value: objCoos.GaligeoToken,
      domain: "ggobo42sp7",
      path: "/",
    },
  ];
await page.setCookie(...cos);

  console.log('setViewport');
  await page.setViewport({ width:  1080, height : 1024 });
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
