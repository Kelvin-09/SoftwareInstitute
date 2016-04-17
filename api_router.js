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
let struct          = require('./api/struct');
let supervisor      = require('./api/supervisor');
let power           = require('./api/power');
let style           = require('./api/style');
// 引入 middleware
// let middlewareName = require('pathToMiddleware');
let config          = require('./config');
let whiteList       = require('./whiteList') || {};
let hasOwnProperty  = require('./common/tool').hasOwnProperty;

let router          = express.Router();

for (let path in whiteList) {
    if (hasOwnProperty(whiteList, path)) {
        for (let method in whiteList[path]) {
            if (hasOwnProperty(whiteList[path], method) && whiteList[path][method]) {
                router[method](['/' + path], power.validate);
            }
        }
    }
}

// 单条新闻
router.get   ('/news', news.NewsGet);
router.post  ('/news', news.NewsPost);
router.put   ('/news', news.NewsPut);
router.delete('/news', news.NewsDelete);

router.get   ('/category', struct.CategoryGet);
router.post  ('/category', struct.CategoryPost);
router.put   ('/category', struct.CategoryPut);
router.delete('/category', struct.CategoryDelete);

router.get   ('/outline', struct.OutlineGet);
router.post  ('/outline', struct.OutlinePost);
router.put   ('/outline', struct.OutlinePut);
router.delete('/outline', struct.OutlineDelete);

router.get('/struct', struct.StructGet);
router.put('/struct', struct.StructPut);

router.get('/newsCategory', news.NewsCategory);
router.get('/newsOutline',  news.NewsOutline);

router.get('/resourceList', resource.ListGet);

router.get('/validate', supervisor.ValidateGet);
router.get('/login', supervisor.LoginGet);

router.get   ('/style', style.get);
router.post  ('/style', style.post);
router.put   ('/style', style.put);
router.delete('/style', style.delete);

router.get('styleAll', style.getAll);
router.put('styleAll', style.putAll);

// router.get('/pValidate', power.validate);

module.exports = router;