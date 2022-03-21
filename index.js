const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express()

const url = "https://www.theguardian.com/world/india";

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = []
        var id = 0;
        $(".fc-item__title", html).each(function () {
            id++;
            const title = $(this).text()
            const url = $(this).find('a').attr("href")
            articles.push({
                id,
                title,
                url
            })
        })

        console.log(articles);
    }).catch(err => () => console.log(err));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));