"use strict";
exports.__esModule = true;
// 定义一个操作Mysql数据库的类
// 注意： 要实现泛型接口，这个类应该是一个泛型类
var MySQLdb = /** @class */ (function () {
    function MySQLdb() {
        console.log('Database connected');
    }
    MySQLdb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MySQLdb.prototype.update = function (info, id) {
        console.log(info);
        return true;
    };
    MySQLdb.prototype["delete"] = function (id) {
        console.log(id);
        return true;
    };
    MySQLdb.prototype.get = function (id) {
        console.log(id);
        return [
            {
                title: 'a title',
                desc: 'a desc line'
            },
            {
                username: 'youheng',
                birthdata: '19990823'
            }
        ];
    };
    MySQLdb.prototype.close = function () {
        console.log('Database closed');
    };
    return MySQLdb;
}());
exports.MySQLdb = MySQLdb;
// Mssql
var MsSQLdb = /** @class */ (function () {
    function MsSQLdb() {
        console.log('Database connected');
    }
    MsSQLdb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MsSQLdb.prototype.update = function (info, id) {
        console.log(info);
        return true;
    };
    MsSQLdb.prototype["delete"] = function (id) {
        console.log(id);
        return true;
    };
    MsSQLdb.prototype.get = function (id) {
        console.log(id);
        return ['true'];
    };
    MsSQLdb.prototype.close = function () {
        console.log('Database closed');
    };
    return MsSQLdb;
}());
exports.MsSQLdb = MsSQLdb;
