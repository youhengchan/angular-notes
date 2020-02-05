// export default 的方法
import getData from './modules/notes_db';

import { saveData as save, dbURL as url} from './modules/notes_db';

import {User, MsSQLdb, MySQLdb} from './modules/db'

console.log('Test Import');
console.log(getData());
console.log("save" + save());
console.log("url" + url);

// Test modules MsSQLdb, MySQLdb
var u = new User({username : 'youhengfordb', password : '13579', sex : 'male'});

let mysqldb = new MySQLdb <User> ();
mysqldb.add(u);
u.password = 'newpaaword12467';
mysqldb.update(u, 1);
console.log(mysqldb.get(1));
mysqldb.delete(1);
mysqldb.close();
