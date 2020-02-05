"use strict";
// user.ts
exports.__esModule = true;
var db_1 = require("../modules/db");
// 定义数据库映射
var UserClass = /** @class */ (function () {
    function UserClass(data) {
        this.username = data.username;
        this.password = data.password;
        if (data.sex) {
            this.sex = data.sex;
        }
    }
    return UserClass;
}());
exports.UserClass = UserClass;
var UserModel = new db_1.MsSQLdb();
exports.UserModel = UserModel;
