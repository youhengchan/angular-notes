# [Angular] 15 - 17 Services

> **by youhengchan** 

## Prerequisite Knowledge
This note holds on to use the project created in the **structual directives**
and add the services (`empolyee.service`) and two new components (`employee-detail | employee-list`).  
  
### What Is Service for ?  
 ***Service*** is a class with specific purpose

      1) Share data (between diff components)
      2) Implement application logic (e.g. Calculate age)
      3) External Interaction (e.g. Connecting to a database)

### Services' Naming Format 
      filename.service.ts


## Project Structure 

The project just inherited from the elder version of the version created before and has useless component - `test` component.

![project-structure](https://i.imgur.com/lHxlo3d.png)

In this section, I generated two new components (`employee-detail` and `employee-list` components) and a service that provides the reusable data.  

### **Hint **  
* To generate component : `ng g c employee-detail` && `ng g c employee-list`
* To generate service : `ng g s employee` (`s` for `service`)  

And the inner logic looks like :   
![inner-logic](https://i.imgur.com/21uqBTG.png)

(The `child` and `grandchild` do not exist in this project, which are used then to demonstrate the inheritance relationship in **Angular**)


## Dependency Injection
### Brief Introduction
      DI(Dependency Injection) is a coding pattern in which 
	  a class receives its dependencies from
	  external sources rather than creating them itself.

      The Angular framework has something called injector where you 
      can register all your dependencies, So the injector is basiclly like 
	  container of all the dependencies that you need to create the 
      instance of final product.

### Designing Mode
	  DI as a design pattern to inject the diff types dynamically.  
	  DI as a framework in Angular and has been implemented as decorators like
	  (`@Injectable`, and also embeded in other decorators like `@Component`).

### Hierarchical DI In Angular
      Angular has a hierarchical dependency injection system
      So consider the example application, it has app module,
      the appModule has appComponent. The appComponent nests 
	  testComponent which then holds employee-list 
      and employee-detail sub-component.

	                            AppModule
	                                |
	                           AppComponent  
	                                |
	                           testComponent    
	                                |
	                    ---------------------------
	                    |                          |
	             employee-list             employee-detail
	                    |
	                  child
	                    |
	                grandchild

One of the possible solution is to register the service in the 
AppModule level and then AppComponent, employee-list/detial can all
have access to the service provided.

So, go to the `app.modules.ts` and the register the service in the metadata - `providers` array : 
		
	  // app.modules.ts 
	  (Many lines has been omitted)
      @NgModule({
        declarations: [
          AppComponent,
          TestComponent,
          EmployeeListComponent,
          EmployeeDetailComponent
        ],
        imports: [
          BrowserModule,
          AppRoutingModule
        ],
        providers: [EmployeeService],     <== rigister here
        bootstrap: [AppComponent]
      })

## Using A Service In Angular

### How To Use Service In Angular   
1. Define the [Employee] Service class
2. Register with Injector [in the app.modules.ts]
3. Declare as dependency [in the classes that contains the service]

### Define the Service Class
* Generate the service with CMD : `ng g s employee`  
  
Add the following code to generate the method to return the data from the service :   

	// employee.service.ts  
	getEmployees () {
		return [
	  		{'id' : 1, name : 'youheng', age : 20},
	  		{'id' : 2, name : 'youhengchan', age : 21},
	  		{'id' : 3, name : 'chanyouheng', age : 20},
	  		{'id' : 3, name : 'chx', age : 20}
		];
	}

And the whole file should look like :  
	
	// employee.service.ts
	import { Injectable } from '@angular/core';
	
	// Injectable decorator enable the EmployeeService to have
	// dependencies, which allow the injection of service into other 
	// services legal
	@Injectable({
	  providedIn: 'root'
	})
	export class EmployeeService {
	
	  constructor() { }
	
	  getEmployees () {
	    return [
	      {'id' : 1, name : 'youheng', age : 20},
	      {'id' : 2, name : 'youhengchan', age : 21},
	      {'id' : 3, name : 'chanyouheng', age : 20},
	      {'id' : 3, name : 'chx', age : 20}
	    ];
	  }
	}



### Register with Injector

This step is really simple, after our rigid analysis above. We know that we just need to regist the service in the `app.module.ts` :  

All we need to do is to add a line : 

	providers: [EmployeeService],  // <== register here

And Angular will automatically fill all the imports : 
	
	// app.module.ts 
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	
	import { AppRoutingModule } from './app-routing.module';
	import { AppComponent } from './app.component';
	import { TestComponent } from './test/test.component';
	import { EmployeeListComponent } from './employee-list/employee-list.component';
	import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
	import { EmployeeService } from './employee.service';
	
	@NgModule({
	  declarations: [
	    AppComponent,
	    TestComponent,
	    EmployeeListComponent,
	    EmployeeDetailComponent
	  ],
	  imports: [
	    BrowserModule,
	    AppRoutingModule
	  ],
	  providers: [EmployeeService],  // <== register here
	  bootstrap: [AppComponent]
	})
	export class AppModule { }


### Declare as dependency 
**[In the classes that contains the service]**   
Firstly, use the service in the `employee-list.component.ts` :   

	// employee-list.component.ts 
	import { Component, OnInit } from '@angular/core';
	import { EmployeeService } from '../employee.service';
	
	@Component({
	  selector: 'app-employee-list',
	  template: `
	  <h2> From employee-detail.Component.ts </h2>
	  <ul *ngFor='let e of employees'>
	    <li> {{ e.id }} {{ e.name }} </li>
	  </ul>
	
	`
	,
	  styleUrls: ['./employee-list.component.css']
	})
	export class EmployeeListComponent implements OnInit {
	  public employees : Array<any> = [];
	  constructor(private _employeeService: EmployeeService) { 
	    // the local variable _employeeService gives us an
	    // instance of EmployeeService.
	    
	    // Then we use the employee instance and fetch the employee data
	    // And code for that goes inside the ngOnInit life cycle hool
	
	  }
	
	  // ngOninit hook gets called once the component 
	  // has been initialized
	  ngOnInit() {
	    this.employees = this._employeeService.getEmployees();
	  }
	
	}
 
Similarly, we can use the service in the `employee-detail.component.ts` as well :  
	
	// employee-detail.component.ts
	import { Component, OnInit } from '@angular/core';
	import { EmployeeService } from '../employee.service';
	
	@Component({
	  selector: 'app-employee-detail',
	  template: `
	    <h2> From employee-detail.Component.ts </h2>
	    <ul *ngFor='let e of employees'>
	      <li> {{ e.id }} {{ e.name }} {{ e.age }} </li>
	    </ul>
	  
	  `
	  ,
	  styleUrls: ['./employee-detail.component.css']
	})
	export class EmployeeDetailComponent implements OnInit {
	  employees: { 'id': number; name: string; age: number; }[];
	  
	
	  constructor(private _employeeList : EmployeeService) { }
	
	  ngOnInit() {
	    this.employees = this._employeeList.getEmployees();
	  }
	
	}

In the end, just add the corresponding tags into the `test.compoennt.ts`  and also embed the `app-test` into the `app.component.html` : 
	
	// test.component.ts
	import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
	
	@Component({
	  selector: 'app-test',
	  template:  `
	    <button (click)='setFire()'>Send Data</button>
	    <h2 *ngIf='info'> hello, parentData : {{ info.name.toString() + ' ' + info.age.toString() }} </h2>
	
	
	    <h2> Employee List </h2>
	    <ul *ngFor='let employee of employees'>
	      <li> {{ employee.name }} </li>
	    </ul>
	    <app-employee-list> </app-employee-list>
	    <app-employee-detail> </app-employee-detail>
	  `,
	  styles: [`
	
	    
	  `]
	})
	export class TestComponent implements OnInit {
	  // Get the data send from parent Component - appComponent
	  public employees = [
	    {'id' : 1, name : 'youheng', age : 20},
	    {'id' : 2, name : 'youhengchan', age : 21},
	    {'id' : 3, name : 'chanyouheng', age : 20},
	    {'id' : 3, name : 'chx', age : 20}
	  ];
	  public toParentData : any = 'To parent';
	  @Input('parentDataName') public info;
	  @Output() public childEvent = new EventEmitter();
	
	  constructor() { }
	
	  ngOnInit() {
	  }
	
	  setFire() : void {
	    this.childEvent.emit(this.toParentData);
	  }
	
	
	}
	
	
And then include the `<app-test>` into root HTML file :
  	
	// app.component.html
	<div>
	    <p>
	        message : {{message}}
	    </p>
	</div>
	
	<app-test (childEvent)='message=$event' [parentDataName]='personInfo'></app-test>
	
	<router-outlet></router-outlet>

Effect : 

![effect](https://i.imgur.com/mouilll.png)
