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

export { MsSQLdb, MySQLdb };