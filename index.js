const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express()

// const url = "https://www.theguardian.com/world/india";
const url = "https://www.imdb.com/list/ls054840033/";

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = []
        var id = 0;
        $(".lister-item-image", html).each(function () {
            id++;
            const name = $(this).find('img').attr("alt");
            const about = $(this).find('a').attr("href")
            const image = $(this).find('img').attr("src");
            articles.push({
                id,
                name,
                about,
                image
            })
        })

        console.log(articles);
    }).catch(err => () => console.log(err));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));