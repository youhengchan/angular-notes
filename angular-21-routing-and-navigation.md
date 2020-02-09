# [Angular] - 21 Routing And Navigation

> **by youhengchan**

## Routing App
1. Generate a project with routing option
2. Generate departmentList and employeeList components
3. Configure the routes
4. Add buttons and use directives to navigate


## Generating A project
* **Default Way**  
![default-way](https://i.imgur.com/HtPZLka.png)  

* **Simple Way**  
`ng new routing-demo --routing`

* **Complex Way**   
Or generate with cmd : `ng new routing-app` without selecting the routing option and mamully add the **AppRoutingModule**:   

    	// app.module.ts
    	import { BrowserModule } from '@angular/platform-browser';
    	import { NgModule } from '@angular/core';
    	
    	import { AppRoutingModule } from './app-routing.module'; // <== add here  
    	
		import { AppComponent } from './app.component';
    	
    	@NgModule({
    	  declarations: [
    	AppComponent
    	  ],
    	  imports: [
    	BrowserModule,

    	AppRoutingModule   // <== add here   
    	  
		  ],
    	  providers: [],
    	  bootstrap: [AppComponent]
    	})
    	export class AppModule { }

And then add the base root to the **index.html** : 
    
	// index.html 
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>RoutingDemo</title>
      
      <!-- Add the following line -->  
	  <base href="/">
      
	  <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body>
      <app-root></app-root>
    </body>
    </html>


## Generate Component

Generate departmentList and employeeList components.  

`ng g c department-list -it -is`  
`ng g c employee-list -it -is` 

(-it && -is stand for inline template and style)

## Configure the routes

Check the file - **app-routing.module.ts**:   
	
	// app-routing.module.ts
	import { NgModule } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';
	
	
	const routes: Routes = [];
	
	@NgModule({
	  imports: [RouterModule.forRoot(routes)],
	  exports: [RouterModule]
	})
	export class AppRoutingModule { }
  
Firstly, we can find an array strongly typed to **Routes** - routes.  

	`const routes: Routes = [];`

We define all possible routes in the routes array for the application.  

Each route is nothing but an object containing a **path** which is reflected  in the URL and **component** to be rendered when we navigate to the corresponding path.  

Here, we need to configure two routes for our application. The first one is department-list and the second one is employees-list.  

In the first route, we write as following :  

	const routes: Routes = [
	  { path: 'department', component: DepartmentListComponent},
	  { path: 'employees', component: EmployeeListComponent}
	];
  
Now we have a problem : **Duplicating Import**  

In file `app.module.ts`, we have :  
	
	// app.module.ts
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	
	import { AppRoutingModule } from './app-routing.module';
	import { AppComponent } from './app.component';
	import { DepartmentListComponent } from './department-list/department-list.component';
	import { EmployeeListComponent } from './employee-list/employee-list.component';

In file `app-routing.modules.ts`, we have :  
	
	// app-routing.modules.ts
	import { NgModule } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';
	import { DepartmentListComponent } from './department-list/department-list.component';
	import { EmployeeListComponent } from './employee-list/employee-list.component';

So we import the modules twice.

To solve this problem, just define an array holding the two component in the `app-routing.module.ts` :  
	
	export const routingComponents = [DepartmentListComponent, EmployeeListComponent];

And then import it in the `app.module.ts` :  

`import { routingComponents } from './app-routing.module';` 
	
And register in the decorator :  

	@NgModule({
	  declarations: [
	    AppComponent,
	    routingComponents   // <== import components array here
	  ],
	  imports: [
	    BrowserModule,
	    AppRoutingModule
	  ],
	  providers: [],
	  bootstrap: [AppComponent]
	})
	export class AppModule { }
  
Then we have to decide where to display the view of the component.  

Namely, we have to decide where to display the following configurations:  

	{ path: 'department', component: DepartmentListComponent},
    { path: 'employees', component: EmployeeListComponent}

The above two lines of code means that when we visit the url : `localhost:4200/department` then show the view of `DepartmentListComponent`. And `localhost:4200/employees` `EmployeeListComponent`.  

Then we have to specify the Actual place for displaying the view.  

In the `app.component.html` file :

	<h2>Welcome to app.component.html</h2>

	<router-outlet></router-outlet>  
	
## Run The Project

Start the project at a different port 1999 :  `ng server --port 1999`   

And open the link in the browser :   

`localhost:1999`     
 ![home](https://i.imgur.com/avLbi2P.png)  

`localhost:1999/employee`  
![employee-page](https://i.imgur.com/7AumgMU.png)  

`localhost:1999/department`  
![department-page](https://i.imgur.com/rVW1ivr.png) 


## Add The Navigation

### Add Styles
	// style.css
	/* You can add global styles to this file, and also import other style files */
	
	nav a.active {
	    color : lightblue;
	    background-color: purple;
	}

### Add Nav In The Root View
	
	// app.component.html
	<h2>Welcome to app.component.html</h2>
	
	<nav>
	  <a routerLink='/department' routerLinkActive='active'>Departments</a>
	  <a routerLink='/employee' routerLinkActive='active'>Employees</a>
	</nav>
	
	<router-outlet></router-outlet> 

`localhost:1999`     
![home-page](https://i.imgur.com/m8ijlzR.png)

`localhost:1999/employee`  
![employee-page](https://i.imgur.com/X4Spnoo.png)

`localhost:1999/department`  
![department-page](https://i.imgur.com/Q09EmXI.png)



	




 
