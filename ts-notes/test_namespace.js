"use strict";
exports.__esModule = true;
// testNamespace.ts
// 用于测试命名空间
var notes_namespace_1 = require("./notes_namespace");
var myDog = new notes_namespace_1.youheng.Dog('youheng\'s dog');
myDog.addFoodType({
    name: 'bone',
    timesPerDay: 3
});
myDog.eat(myDog.food[0]);
var myCat = new notes_namespace_1.youhengchan.Cat('youhengchan\'s cat');
myCat.eat(myDog.food[0]);
