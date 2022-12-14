const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('fce69b099b7f4e77ac24ab66ecf3afe9');
const config = require('../config.json');
const db = require('../_helpers/database');
const UserPreference = db.userPreference;

module.exports = {
    returnNews,
    sendFields,
    headlines
}

async function returnNews(req) {
    let all_articles = newsapi.v2.everything({
        q: req.query,
        language: 'en',
        from: req.startDate,
        to: req.endDate
    });

    return all_articles;
}

async function sendFields(req) {
   if(await UserPreference.findOne({username: req.username})) {
        return UserPreference.updateOne({username: req.username}, {$set: {query: req.query, category: req.category}})
    } else {
        const userPreference = new UserPreference(req);
        return await userPreference.save();
    }
}

async function headlines() {
    let all_articles = newsapi.v2.topHeadlines({
        language: 'en'
    });

    return all_articles;
}
