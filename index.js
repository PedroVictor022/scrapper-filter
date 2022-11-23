const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let url = "http://imdb.com/chart/moviemeter";

async function getData() {
  request(url, function (err, res, body) {
    if (err) console.log(`Error - ${err}`);

    const $ = cheerio.load(body);

    $(".lister-list tr").each(function () {
      const title = $(this).find(".titleColumn a").text().trim();
      const rating = $(this).find(".ratingColumn strong").text().trim();

      console.log(`${title} - ${rating}\n`);

      fs.appendFile("list.txt", `${title} - ${rating}\n`, (err) => {
        return err;
      });
    });
  });
}

getData();
