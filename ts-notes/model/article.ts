// article.ts

import {MsSQLdb} from '../modules/db';

interface ArticleInf {
	title : string | undefined;
	author : string | undefined;
}


class ArticleClass {
	title : string | undefined;
	author : string | undefined;
	constructor (data : ArticleInf) {
		this.title = data.title;
		this.author = data.author;
	}
}


var ArticleModel = new MsSQLdb <ArticleClass> ();

export { ArticleClass, ArticleModel };

