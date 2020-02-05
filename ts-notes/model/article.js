"use strict";
// article.ts
exports.__esModule = true;
var db_1 = require("../modules/db");
var ArticleClass = /** @class */ (function () {
    function ArticleClass(data) {
        this.title = data.title;
        this.author = data.author;
    }
    return ArticleClass;
}());
exports.ArticleClass = ArticleClass;
var ArticleModel = new db_1.MsSQLdb();
exports.ArticleModel = ArticleModel;
