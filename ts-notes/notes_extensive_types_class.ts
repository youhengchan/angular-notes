// 泛型类

// 比如有个最小堆算法

class MinClass <T> {
	public list : T[] = [];
	add (num : T) {
		this.list.push(num);
	} 
	min () : T;
	min () : number;
	min () : null;
	min () : any {
		if (this.list.length === 0) {
			return null;
		}
		else {
			let mIndex = 0;
			let l = this.list;
			for (let i : number = 0 ; i < this.list.length ; ++i) {
				mIndex = l[mIndex] > l[i] ? i : mIndex;
			}
			return l[mIndex];
		}
	}
}

let mc = new MinClass <string>();

mc.add('z1');
mc.add('b22');
mc.add('a333');

console.log(mc.min());

/*

泛类：
1. 定义一个类
2. 把类作为参数约束数据传入的类型

*/

/*

定义一个User类，这个类的作用是映射数据库的字段
然后定义一个Mysql的类这个类用于操作数据库
然后把User类作为参数传入到Mysql数据库中

var user = new User ({
	username : 'youheng',
	password : '123456'
});

var db = new MySQLdb();
db.add(user);

*/

// 数据库表映射类
class User {
	username : string | undefined;
	password : string | undefined;
}

class ArticleCategory {
	title : string | undefined;
	desc : string | undefined;
	status : number | undefined;
	author : string | undefined;
}

class WiredData {
	w1 : string | number | undefined;
	w2 : number | undefined;
	w3 : boolean | never | undefined; 
}

// 数据库操作类
class MySQLdb {
	add (data : ArticleCategory) : boolean;
	add (data : User) : boolean;
	add (data : any) : boolean {
		console.log(data);
		return true;
	}
}

var usr = new User();

usr.username = 'youheng';
usr.password = '654321';

var db = new MySQLdb();


db.add(usr);


var article = new ArticleCategory();

article.author = 'youheng';
article.status = 1;  // finished
article.desc = 'an article wriiten by youheng';
article.title = 'Title of Article';

db.add(article);

// 下面加入泛型，就会很方便

// 数据库表映射类
class User {
	username : string | undefined;
	password : string | undefined;
}

class ArticleCategory {
	title : string | undefined;
	desc : string | undefined;
	status : number | undefined;
	author : string | undefined;
}

class WiredData {
	w1 : string | number | undefined;
	w2 : number | undefined;
	w3 : boolean | never | undefined; 
}

// 数据库操作类
class MySQLdb <T> {
	add (data : T) : boolean;
	add (data : ArticleCategory) : boolean;
	add (data : User) : boolean;
	add (data : any) : boolean {
		console.log(data);
		return true;
	}
}

var usr = new User();

usr.username = 'youheng';
usr.password = '654321';

let db = new MySQLdb <WiredData> ();


db.add(usr);


var article = new ArticleCategory();

article.author = 'youheng';
article.status = 1;  // finished
article.desc = 'an article wriiten by youheng';
article.title = 'Title of Article';

db.add(article);

let wiredObj = new WiredData ();


wiredObj.w1 = '1346136436';
wiredObj.w3 = true;

db.add(wiredObj);

// 上面的这种设计，是保证了两种基本类型article和user能够被正确写入数据库
// 后期可以通过指定泛型的具体类型，来对数据进行
// 类型校验，例如实例化T === WiredData的db对象
// 就能够保证通过该db写入数据库的数据一定是
// ArticleCategory, User, WiredData三类数据


// 结合接口进行类型校验
// 个人 (youheng) 在学习完接口和类之后
// 发现接口和普通类（非抽象）都可以用于类型
// 校验，所以就结合接口和类写了下面的Demo
// 用接口做类型校验，用泛型类实现复用
// 有一个问题没有解决：
// 如何重载构造函数constructor使得其既可以
// 接受任意个数参数（包括0个）？
// 数据库表映射类

interface UserInf {
	username : string | undefined;
	password : string | undefined;
	sex ?: string;  // 该参数不一定要实现
}

class User {
	username : string | undefined;
	password : string | undefined;
	sex : string | undefined;
	// 在构造函数中对接收到的数据进行验证
	constructor (data : UserInf) {
		this.username = data.username;
		this.password = data.password;
		if (data.sex) {
			this.sex = data.sex;
		}
	}
	
}

// 数据库操作类
class MySQLdb <T> {
	add (data : T) : boolean {
		console.log(data);
		return true;
	}
	update (data : T, id ?: number) : boolean {
		console.log('update : ');
		if (id) {
			console.log(id);
		} 
		console.log(data);
		return true;
	}
}

let db = new MySQLdb <User> ();

/* Error: the constructor expect  1 arguments
   but got 0
var usr1 = new User();

usr1.username = 'youheng';
usr1.password = '654321';

db.add(usr1);

*/


var usr2 = new User({username:'youheng', password : '66666', sex : 'male'});

db.add(usr2);

let usr3 = new User({username:'youhengchan', password : '19990823'});

db.add(usr3);

usr3.password = '1234';

db.update(usr3);

