const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

let url = "https://en.wikipedia.org/wiki/The_Game_Awards_2021";

request(url, function (err, res, body) {
  if (err) console.log(err);

  const $ = cheerio.load(body);

  $(".wikitable tbody tr").each(function () {
    const titles = $(this).find("td ul li ul li a").first().text().trim();
    console.log(`${titles}\n`);

    fs.appendFile("gamesList.txt", `${titles}\n`, function (err) {
      console.log(err);
    });
  });
});
