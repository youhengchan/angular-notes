// index.ts
// 测试MongoDB 风格封装

import { UserClass, UserModel } from './model/user';
import { ArticleClass, ArticleModel } from './model/article'


var u = new UserClass ({
	username : 'youheng',
	password : '12347890',
	sex : 'male'
});

var a = new ArticleClass ({
	title : 'begin again',
	author : 'youheng'
});


// Test User API
UserModel.add(u);
var res = UserModel.get(123);
console.log(res);


// Test Article API
ArticleModel.add(a);
var res1 = ArticleModel.get(456);
var res2 = ArticleModel.add(a);
var res3 = ArticleModel.delete(1);
a.title = 'Begin again';
var res4 = ArticleModel.update(a, 1);
res = [res1, res2, res3, res4];
console.log(res);