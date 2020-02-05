"use strict";
exports.__esModule = true;
// export default 的方法
var notes_db_1 = require("./modules/notes_db");
var notes_db_2 = require("./modules/notes_db");
var db_1 = require("./modules/db");
console.log('Test Import');
console.log(notes_db_1["default"]());
console.log("save" + notes_db_2.saveData());
console.log("url" + notes_db_2.dbURL);
// Test modules MsSQLdb, MySQLdb
var u = new db_1.User({ username: 'youhengfordb', password: '13579', sex: 'male' });
var mysqldb = new db_1.MySQLdb();
mysqldb.add(u);
u.password = 'newpaaword12467';
mysqldb.update(u, 1);
console.log(mysqldb.get(1));
mysqldb["delete"](1);
mysqldb.close();
