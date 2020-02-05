// testNamespace.ts
// 用于测试命名空间
import { youheng as yhNameSpace, youhengchan as yhcNameSpace } from './notes_namespace';

var myDog = new yhNameSpace.Dog('youheng\'s dog');

myDog.addFoodType({
		name : 'bone',
		timesPerDay : 3
	});

myDog.eat(myDog.food[0]);

var myCat = new yhcNameSpace.Cat('youhengchan\'s cat');

myCat.eat(myDog.food[0]);

// 低版本(version < 2)的命名空间支持以下语法：
// </// reference path='Validation.ts' />
