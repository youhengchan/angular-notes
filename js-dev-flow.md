# [JS]  Dev in Modern Manner

> **by youhengchan**

## Content
* [Tools](#Tools)
* [Common Tools](#Common-Tools)  
* [CMDs on Win](#CMDs-on-Win)
* [Set Up Envs](#Set-Up-Envs)  


<h2 id="Tools">Tools</h2>
* module bundlers
* task runner
* external packages 
* other dev tools


<h2 id="Common-Tools">Common Tools</h2>
### NPM  
A js package manager.  

### Babel
Babel converts ES6,7,8 js back to ES5 and make sure the js code can be run on any brower.  

### Webpack  
To use the ES6 modules, we could use webpack to make our code easier to maintain by seperating different part of our app into different files and then bundle these files together.  

This tool can actually do much more than just bundle modules. Like codesplitting, loading menu types of assets like scss or images, decreasing the javascript bundle size using the algorithm called tree-shaking and much more.  

### Browerify
The browser can not run the `CommonJS` style code for lacking of some modules : `module`, `exports`, `require`, `global`. **Browserify** can fix this automatically. Just download this tool by 
`npm install -g browserify`. And type the CMD : `browserify myApp.js > myApp-translated.js` and then get the runnable code  `myApp-translated.js` in the browser.  

<h2 id="CMDs-on-Win">CMDs on Win</h2>
### Create New Files 
`copy nul file-name` wiil create a new file named `file-name`.  

### Copy Files
`copy file-name dir/to/copied-file-name`  

### Move Files (Rename) 
`move file-name dir/to/file-name`

### Delete Files
`del /dir/to/file-name`  

### Create Folder
`mkdir folder-name`

### Remove Folder Recursively
`rmdir /s folder-name`

### Open Files
`start file-name`  

### Force Delete
`rd/s/q folder-name`

<h2 id="Set-Up-Envs">Set Up Envs</h2>
In this project, we gonna first set up the env with npm scripts, Webpack and Babel by installing [Node.js](nodejs.org) and npm on our computer.  

### Check Versions


`node -v`  && `npm -v`   

### Npm cmds
* install modules : `npm install webpack -g | npm install webpack --global` (global) && `npm install webpack | npm install webpack --save-dev` (local)
* Set the global storage path :   

    	npm config set prefix "D:\Program Files\nodejs\node_global"
		npm config set cache "D:\Program Files\nodejs\node_cache"
* Set the sys env variable - `PATH` (for global calling)  
![set-global-01](https://i.imgur.com/gcY8VMB.png)  
![set-global-02](https://i.imgur.com/6xDYKzO.png)  
* Set the sys env variable - `NODE_PATH` (for `require` functionality)
![node-path](https://i.imgur.com/ej1AVdS.png)    
* Install via lock-file `npm install --from-lock-file` (ignore the package.json file and install via package-lock.json)
* Install without updating lock-file `npm install --no-save`
* Uninstall useless packages `npm uninstall package-name --save`  


### Npm Workflow  
* **Change NPM SRC**  
`npm config set registry https://registry.npm.taobao.org`
* `npm init`     
![npm-init-prompt](https://i.imgur.com/i6kogdP.png)  
* **Set the package name**  
Enter the package name following the instructions : **forkapp** (self-defined)  
![set-package-name](https://i.imgur.com/khY4tEB.png)
* **Add description**
* **Other Settings**  
Just click 'Enter' and use the default settings.
* **Install Webpack**  `npm install --save-dev webpack` (for development)
* **Install Webpack-cli**  `npm install webpack-cli --save-dev`  (for npm scripts)
* **Install JQuery** `npm install jquery | npm install jquery --save`  (for production)


### Test Cases
#### Create the `webpack.config.js` file
![webpack-config](https://i.imgur.com/0yteepj.png)  
	
	//	webpack.config.js
	const path = require('path');

	module.exports = {
		entry: "./src/js/index.js",
		output: {
			path: path.resolve(__dirname, 'dist'),  // __dirname is the current working dir 
			filename: "js/bundle.js"
		}
	}

#### Create the `test.js` file and fill the `index.js` file

	// test.js
	console.log('Imported module');
	export default 23;

	// index.js
	// Global app controller
	import num from './test'
	console.log(`I imported ${num} from another module`);


#### Modify the scipts options in `package.json` file
	
	// package.json
	{
	  "name": "forkapp",
	  "version": "1.0.0",
	  "description": "The first app using npm init",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "dev": "webpack"
	  },
	  "author": "youheng",
	  "license": "ISC",
	  "dependencies": {
	    "jquery": "^3.4.1"
	  },
	  "devDependencies": {
	    "babel": "^6.23.0",
	    "webpack": "^4.41.6",
	    "webpack-cli": "^3.3.11"
	  }
	}

In this file, I added the line :  `"dev": "webpack"` which enables us with cmd -  `npm run dev` to invoke wekpack to bundle all the files setted in the `webpack.config.js`.  


#### Run the cmd `npm run dev`  
![npm-run-dev](https://i.imgur.com/BABve44.png)  
This cmd then generated the target file - `bundle.js` as specified in the `webpack.config.js`.  

#### Create a new HTML file to verify `bundle.js`  
![verify-html](https://i.imgur.com/k3pTzVI.png)  
This file should be created in the dist folder.  

	// index.html
	<!DOCTYPE html>
	<html>
	<head>
		<title>test-bundle.js</title>
	</head>
	<body>
		<script type="text/javascript" src="./js/bundle.js"></script>
	</body>
	</html>

#### Run in the browser
![run-in-browser](https://i.imgur.com/0zu3Zpu.png)
  
#### Add mode configuration in npm scripts

We initially set the mode in the `webpack.config.js` file:  

	// webpack.config.js
	const path = require('path');

	module.exports = {
		entry: "./src/js/index.js",
		output: {
			path: path.resolve(__dirname, 'dist'),  // dirname is the current working dir 
			filename: "js/bundle.js"
		}
		// mode: "development"
	}

To avoid modify the mode in this file manually, we can set the mode configuration in the `package.json` file.  

	// package.json
	{
	  "name": "forkapp",
	  "version": "1.0.0",
	  "description": "The first app using npm init",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "dev": "webpack --mode development",
	    "build": "webpack --mode production"
	  },
	  "author": "youheng",
	  "license": "ISC",
	  "dependencies": {
	    "jquery": "^3.4.1"
	  },
	  "devDependencies": {
	    "babel": "^6.23.0",
	    "webpack": "^4.41.6",
	    "webpack-cli": "^3.3.11"
	  }
	}

And then call `npm run build` in the cli.  

![npm-run-build](https://i.imgur.com/gkz1qrc.png)   

#### Install webpack dev server
`npm install webpack-dev-server --save-dev`  

Specify the folder to be inspected in the `webpack.config.js` as `devServer` :  
 
	// webpack.config.js
	const path = require('path');
	
	module.exports = {
		entry: "./src/js/index.js",
		output: {
			path: path.resolve(__dirname, 'dist'),  // dirname is the current working dir 
			filename: "js/bundle.js"
		},
		devServer: {
			contentBase: './dist'
		}
		// mode: "development"
	}

And then add the npm script in the `package.json` file :  
	
	// package.json
	{
	  "name": "forkapp",
	  "version": "1.0.0",
	  "description": "The first app using npm init",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1",
	    "dev": "webpack --mode development",
	    "build": "webpack --mode production",
	    "start": "webpack-dev-server --mode development --open"
	  },
	  "author": "youheng",
	  "license": "ISC",
	  "dependencies": {
	    "jquery": "^3.4.1"
	  },
	  "devDependencies": {
	    "babel": "^6.23.0",
	    "webpack": "^4.41.6",
	    "webpack-cli": "^3.3.11",
	    "webpack-dev-server": "^3.10.3"
	  }
	}

Finally run the dev server : `npm run start | npm start`.  

![npm-run-server](https://i.imgur.com/NsWIqc6.png)  

#### Install `html-webpack-plugin` to inject code dynamically  

`npm install html-webpack-plugin --save-dev`  

Then enable the plugin in the `webpack.config.js` file :  
	
	// webpack.config.js
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	
	module.exports = {
		entry: "./src/js/index.js",
		output: {
			path: path.resolve(__dirname, 'dist'),  // dirname is the current working dir 
			filename: "js/bundle.js"
		},
		devServer: {
			contentBase: './dist'
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './src/index.html'
	
			})
		]
		// mode: "development"
	}

`filename` is for the destination file (copied or generated by webpack).  
`template` is the source file that webpack refer to.  

*Hint : Webspack can also generate the HTML file automatically without the source file. (Not discussed here)*  



  

  

 
  











   

 







  


  
