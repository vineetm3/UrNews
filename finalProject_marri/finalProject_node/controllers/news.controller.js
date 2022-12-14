const newsService = require('../services/news.service');

module.exports = {
    getNews,
    sendNews,
    getHeadlines
}

function getNews(req, res, next) {
    let promise = newsService.returnNews(req.params);

    promise.then(array => {
        res.json(array);
    }).catch(err => next(err));
}

function sendNews(req, res, next) {
    console.log(req.body);
    let promise = newsService.sendFields(req.body);

    promise.then(() => res.json({})).catch(err => next(err));
}

function getHeadlines(req, res, next) {
    let promise = newsService.headlines();

    promise.then(array => {
        res.json(array);
    }).catch(err => next(err));
}
