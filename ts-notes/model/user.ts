// user.ts

import {MsSQLdb} from '../modules/db'

// 定义数据规范
interface UserInf {
	username : string | undefined;
	password : string | undefined;
	sex ?: string | undefined;
}

// 定义数据库映射
class UserClass {
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

var UserModel = new MsSQLdb <UserClass> ();
export {UserClass, UserModel};
