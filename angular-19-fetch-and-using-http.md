# [Angular] 19 - Fetch and Using Http  

> **by youhengchan**  


From Angular 5, we no more use the http module and 
then use httpClient module which provides a set of
simplified APIs for HTTP functionality for use with 
Angular applications.

## Four Steps To Use Http
* HTTP Get request from `EmployeeService`
* Receive the observable and cast it into an employee array
* Subscribe to the observable from `EmployeeListComponent` and `EmployeeDetailComponent`
* Assign the employee array to a local variable 


## Register the HttpClientModule
The first step is to register **HttpClientModule** in the `app.module.ts` (The reason why should we register the module in this place has been decleared in the **Notes: `[Angular] 15 - 17 Services`**)  

	// app.modules.ts 
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	
	import { AppRoutingModule } from './app-routing.module';
	import { AppComponent } from './app.component';
	import { TestComponent } from './test/test.component';
	import { EmployeeListComponent } from './employee-list/employee-list.component';
	import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
	import { EmployeeService } from './employee.service';
	import { HttpClientModule } from '@angular/common/http';  // <== import the HttpClientModule
	
	@NgModule({
	  declarations: [
	    AppComponent,
	    TestComponent,
	    EmployeeListComponent,
	    EmployeeDetailComponent
	  ],
	  imports: [
	    BrowserModule,
	    AppRoutingModule,
	    HttpClientModule    // <== Add it into the imports, and then HttpClientModule has the access to the whole appModule
	    // After registering the HttpClientModule, we are also registering the HttpService, namely, We no more have to register it
	    // in the providers array down below, we don't have to explicitly
	    // register it by adding it to the providers' metadata. The HttpClient module
	    // will do it automatically
	  ],
	  providers: [EmployeeService],  // <== register self-defined service here
	  bootstrap: [AppComponent]
	})
	export class AppModule { }

## Use Http.get() In Service Class

To use the http in the `employee.service.ts`, We then declear it as a dependency in the class constructor of the `EmployeeService` in the `employee.service.ts` file. So in the employee service class, within the constructor's params list, type: `private http: HTTPClient`:  
	
	// employee.service.ts
	import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';   // <== import the HttpClient as well
	 
	// Injectable decorator enable the EmployeeService to have
	// dependencies, which allow the injection of service into other 
	// services legal
	@Injectable({
	  providedIn: 'root'
	})
	export class EmployeeService {
	  private _url : string = '/assert/data/employees.json';
	  constructor(private http : HttpClient) { }  // <== add httpClient here
	  // Now we can use the http to refer to an instance of HttpClient
	  
	  // So we are ready to use get request to fetch data using HTTP
	  
	  getEmployees () {
	    // The get mothod takes an url as its argument
	    return this.http.get(this._url);
	  }
	}

## Create the Data File

To use the `get` method, We create a new file (`/assert/data/employees.json`) assume to be the file on the server.  

	//assert/data/employees.json
	[
	    {"method" : "http get()", "id" : 1, "name" : "youheng", "age" : 20},
	    {"method" : "http get()", "id" : 2, "name" : "youhengchan", "age" : 21},
	    {"method" : "http get()", "id" : 3, "name" : "chanyouheng", "age" : 20},
	    {"method" : "http get()", "id" : 3, "name" : "chx", "age" : 20}
	]


So far, we have created the service that can be used in the other components with virtual data that can be fetched through the method in service: `getEmployees`  , and we gonna use it in the `EmployeeDetailComponent` and `EmployeeListComponent`.  

The `getEmployees` method returns an observable object:  
`(method) EmployeeService.getEmployees(): Observable<Object> ` 

Then we need to parse the observable into the data that can be used in the project.  

## Data Type Casting

To cast the data from an observable into usable data. We can use the **Type Conversion**.  

First define the employee interface to do the type conversion in a seperate file : 

	// employee.ts
	export interface IEmployee {
	    method: string,
	    id: number,
	    name: string,
	    age: number
	}

And then import this file as a module into `employee.service.ts`:  

Modify the line: `return this.http.get<Array<IEmployee>>(this._url);`	

Then the `EmployeeService` will return the employee array.  

And specify the return data type:  
	
	getEmployees () : Observable<Array<IEmployee>> {
	    // The get mothod takes an url as its argument
	    return this.http.get<Array<IEmployee>>(this._url);
	}

Finally, do not forget to import the dependencies :  (vscode IDE will auto fix this) 

	import { IEmployee } from './employee'; // <== for data casting
	import { Observable } from 'rxjs';  // <== for data casting

### RxJS
    Reactive Extensions for Javascript
    External library to work with Observables

## Subscribe To The Observable From The Components

Here, we subscribe the observable from `EmployeeListComponent` and `EmployeeDetailComponent`.  

First handle the `employee-list.component.ts` :  
	
	// list.component.ts
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

Now we are going to subscribe to the observable returned by the `getEmployees()` method.

Change the line of code :   
`this.employees = this._employeeService.getEmployees();` 

Into :  

`this._employeeService.getEmployees().subscribe(data => this.employees = data);`  

And then do the same thing to the `enployee-detail.com.ts` as well.  


## Effect  
    
![Effect](https://i.imgur.com/MU7QGhc.png)

  
## Conclusion
* First inlucde the HttpCLientModule and register it in the `imports[]` metadata
* Next, inject the httpClient as a dependency in the `employee.service.ts`  
* Then, use RXJS to converte (with self-defined Interface) retuen type from observable into usable data type
* In the end, subscribe the observable in the component that need the data (`employee-list.component.ts` and `employee-detail.component.ts`) and bind the data to the view. 
 






  

