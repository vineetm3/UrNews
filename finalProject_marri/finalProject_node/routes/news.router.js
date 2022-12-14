const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');

router.get('/newsTest/:query', newsController.getNews);
router.post('/sendData', newsController.sendNews)
router.get('/headlines', newsController.getHeadlines)
module.exports = router;
