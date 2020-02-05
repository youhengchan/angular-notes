// Ts 类型、接口、类、泛型 综合使用
// 封装统一操作 Mysql Mongodb Mssql 的底层类库

/* 定义一个操作数据库的库

1. 支持 Mysql, Mssql, Mongodb
2. Mysql, Mssql, Mongodb 具有统一接口
	add, update, delete, get 方法

3. 约束统一的规范，代码的重用 

解决方法：
	1. 接口
		在面向对象的过程中，接口是一种规范的定义
			定义了行为和动作的规范
	2. 泛型
		泛型解决类、接口、方法的复用


*/

interface DBI <T> {
	add (info : T) : boolean;
	update (info : T, id : number) : boolean;
	delete (id : number) : boolean;
	get (id : number) : any[];
	close () : void;
}

// 定义一个操作Mysql数据库的类
// 注意： 要实现泛型接口，这个类应该是一个泛型类
class MySQLdb <T> implements DBI <T> {
	constructor () {
		console.log('Database connected');
	}
	add (info : T) : boolean {
		console.log(info);
		return true;
	}
	update (info : T, id : number) : boolean {
		console.log(info);
		return true;
	}
	delete (id : number) : boolean {
		console.log(id);
		return true;
	}
	get (id : number) : Array<any> {
		console.log(id);
		return [
			{
				title : 'a title',
				desc : 'a desc line'
			},
			{
				username : 'youheng',
				birthdata : '19990823'
			}
		];
	}
	close () : void {
		console.log('Database closed');
	}
}

// Mssql
class MsSQLdb <T> implements DBI <T> {
	constructor () {
		console.log('Database connected');
	}
	add (info : T) : boolean {
		console.log(info);
		return true;
	}
	update (info : T, id : number) : boolean {
		console.log(info);
		return true;
	}
	delete (id : number) : boolean {
		console.log(id);
		return true;
	}
	get (id : number) : Array<any> {
		console.log(id);
		return ['true'];
	}
	close () : void {
		console.log('Database closed');
	}
}

// 操作用户表
// 定义一个 User 类和数据表做映射

interface UserInf {
	username : string | undefined;
	password : string | undefined;
	sex ?: string | undefined;
}

class User {
	username : string | undefined;
	password : string | undefined;
	sex : string | undefined;
	constructor (data : UserInf) {
		this.username = data.username;
		this.password = data.password;
		if (data.sex) {
			this.sex = data.sex;
		}
	}
}

// UserInf 接口验证传入数据的合法性
var u = new User({username : 'youhengfordb', password : '13579', sex : 'male'});


// User类作为参数验证写入数据的合法性
let mysqldb = new MySQLdb <User> ();
mysqldb.add(u);
u.password = 'newpaaword12467';
mysqldb.update(u, 1);
console.log(mysqldb.get(1));
mysqldb.delete(1);
mysqldb.close();