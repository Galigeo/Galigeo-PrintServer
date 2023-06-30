
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const axios = require("axios");
app.use(cookieParser());


const port = process.env.PORT || 3000;
app.get("/alive", async (req, res) => {
  res.send({ message: "Galigeo Print Server is up and running on container port " + port });
});
app.get("/print", async (req, res) => {
  try {
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
    console.log(req.query);
    const width = parseInt(req.query.width) ;
    const height =  parseInt(req.query.height);
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
  
  
    await page.setViewport({ width: width ? width : 1080, height: height? height :1024 });
    console.log('setViewport');
    const { blue, cyan, green, magenta, red, yellow } = require('colorette')
    page
      .on('console', message => {
        const type = message.type().substr(0, 3).toUpperCase()
        const colors = {
          LOG: text => text,
          ERR: red,
          WAR: yellow,
          INF: cyan
        }
        const color = colors[type] || blue
        console.log(color(`${type} ${message.text()}`))
      })
      .on('pageerror', ({ message }) => console.log(red(message)))
      .on('response', response =>
        console.log(green(`${response.status()} ${response.url()}`)))
      .on('requestfailed', request =>
        console.log(magenta(`${request.failure().errorText} ${request.url()}`)))
       
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
        if ((first + 60000) < Date.now()) {
          console.log('force exit afer 60000 ms');
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
	  console.log("Image is in cache folder");
    } else {
      res.send({ message: "time out after 60 s" });
	  console.log("time out after 60 s");
    }
  } catch (error) {
    res.send({ log:error,message: 'print server can t print image' });
	console.log('print server can t print image');
	console.log('error:',error);
  }

});

app.listen(port, () => {
  console.log("Galigeo Print Server is listening on container port " + port);
});
