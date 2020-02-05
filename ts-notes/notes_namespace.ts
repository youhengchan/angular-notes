// Ts : namespace
/* 命名空间：
	在代码量较大的情况下，为了避免各种变量名称相冲突，可以将相似功能的函数、类、接口等放到命名空间内
	同Java的包，.Net的命名空间一样，TypeScript的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象。命名空间内的对象通过export进行导出。

命名空间和模块的区别：
	命名空间：内部模块，主要用于组织代码和避免冲突

	模块：ts的外部模块的简称，侧重代码的复用，一个模块里可能会有多个命名空间
*/

// 如果要导出一个命名空间，除了命名空间中的元素前加上export之外，命名空间前面也要加上export


export namespace youheng {
	
	interface AnimalFoodInf {
		name : string;
		timesPerDay ?: number; 
	}

	interface Animal {
		name : string;
		eat(food : AnimalFoodInf) : void | boolean;
	}

	export class Dog implements Animal {
		name : string;
		food : AnimalFoodInf[] = [];
		eat (food : AnimalFoodInf) : void {
			if (food.timesPerDay) {
				console.log(`[Dog log] ${this.name} is eating ${food.name} ${food.timesPerDay} times a day`);
			} else {
				console.log(`[Dog log] ${this.name} is eating ${food.name}`); 
			}
		}; 
		constructor (name : string) {
			this.name = name;		
		};
		addFoodType (food : AnimalFoodInf) {
			this.food.push(food);
		};
	}

	export class Cat implements Animal {
		name : string;
		food : any[] = [];
		eat (food : AnimalFoodInf) : void {
			if (food.timesPerDay) {
				console.log(`[Cat log] ${this.name} is eating ${food.name} ${food.timesPerDay} times a day`);
			} else {
				console.log(`[Cat log] ${this.name} is eating ${food.name}`);
			}
		};
		constructor (name : string) {
			this.name = name;		
		};
		addFoodType (food : AnimalFoodInf) {
			this.food.push(food);
		};
	}

}

export namespace youhengchan {
	interface AnimalFoodInf {
		name : string;
		timesPerDay ?: number; 
	}

	interface Animal {
		name : string;
		eat(food : AnimalFoodInf) : void | boolean;
	}

	export class Dog implements Animal {
		name : string;
		food : AnimalFoodInf[] = [];
		eat (food : AnimalFoodInf) : void {
			if (food.timesPerDay) {
				console.log(`[Dog log] ${this.name} is eating ${food.name} ${food.timesPerDay} times a day`);
			} else {
				console.log(`[Dog log] ${this.name} is eating ${food.name}`); 
			}
		}; 
		constructor (name : string) {
			this.name = name;		
		};
		addFoodType (food : AnimalFoodInf) {
			this.food.push(food);
		};
	}

	export class Cat implements Animal {
		name : string;
		food : any[] = [];
		eat (food : AnimalFoodInf) : void {
			if (food.timesPerDay) {
				console.log(`[Cat log] ${this.name} is eating ${food.name} ${food.timesPerDay} times a day`);
			} else {
				console.log(`[Cat log] ${this.name} is eating ${food.name}`); 	
			}
		};
		constructor (name : string) {
			this.name = name;		
		};
		addFoodType (food : AnimalFoodInf) {
			this.food.push(food);
		};
	}
}

/*
var myDog = new youheng.Dog('youheng\'s dog');

myDog.addFoodType({
	name : 'bone',
	timesPerDay : 3
});

myDog.eat(myDog.food[0]);


var myCat = new youheng.Cat('youheng\'s cat');

myCat.addFoodType({
	name : 'fish',
	timesPerDay : 2
});

myCat.eat(myDog.food[0]);
myCat.eat(myCat.food[0]);
*/