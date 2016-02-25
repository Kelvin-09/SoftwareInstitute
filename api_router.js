/*!
 * softwareinstitute - api_router.js
 */

/**
 * Module dependencies.
 */
'use strict';

let express         = require('express');
// 引入 api
let resource        = require('./api/resource');
let news            = require('./api/news');
// 引入 middleware
// let middlewareName = require('pathToMiddleware');
let config          = require('./config');

let router          = express.Router();

router.get('/ResourceList', resource.ResourceList);
router.get('/NewsListCategory', news.NewsListCategory);
router.get('/NewsListOutline', news.NewsListOutline);
router.get('/NewsDetail', news.NewsDetail);
router.get('/OutlineCategory', news.OutlineCategory);
router.get('/StyleCategory', news.StyleCategory);
router.get('/StyleOutline', news.StyleOutline);

module.exports = router;