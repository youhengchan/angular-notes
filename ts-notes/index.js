"use strict";
// index.ts
// 测试MongoDB 风格封装
exports.__esModule = true;
var user_1 = require("./model/user");
var article_1 = require("./model/article");
var u = new user_1.UserClass({
    username: 'youheng',
    password: '12347890',
    sex: 'male'
});
var a = new article_1.ArticleClass({
    title: 'begin again',
    author: 'youheng'
});
// Test User API
user_1.UserModel.add(u);
var res = user_1.UserModel.get(123);
console.log(res);
// Test Article API
article_1.ArticleModel.add(a);
var res1 = article_1.ArticleModel.get(456);
var res2 = article_1.ArticleModel.add(a);
var res3 = article_1.ArticleModel["delete"](1);
a.title = 'Begin again';
var res4 = article_1.ArticleModel.update(a, 1);
res = [res1, res2, res3, res4];
console.log(res);
