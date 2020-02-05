// notes_db.ts
// 本文件用于验证ts的module工作机制

// 第一种导出的方法：直接在变量名和函数名前面加上export
// export var dbURL = '127.0.0.1:8080';
var dbURL = '127.0.0.1:9999';

// export function getData () : any[] {
function getData () : any[] {
	console.log('Load data from database');

	return [
		{
			title : 'title',
			content : 'content'
		},
		{
			header : 'header',
			author : 'youheng'
		}
	];
};

console.log('check tsc working chain');

// export function saveData () {
function saveData () {
	console.log('Save the log');
}

// 另外一种导出的方法
export {dbURL, saveData};

export default getData; // 该方法，export default 只能使用一次