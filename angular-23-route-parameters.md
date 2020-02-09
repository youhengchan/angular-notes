#[Angular] 23 - Route Parameters 

> **by youhengchan**  

## Route Parameters

### Virtual Data and Navigate

	// department-list.component.ts
	import { Component, OnInit } from '@angular/core';
	import { Router } from '@angular/router';
	
	@Component({
	  selector: 'app-department-list',
	  templateUrl: './department-list.component.html',
	  styleUrls: ['./department-list.component.css']
	})
	export class DepartmentListComponent implements OnInit {
	
	  departments = [
	    {"id": 1, "name": "Angular"},
	    {"id": 2, "name": "Node"},
	    {"id": 3, "name": "MongoDB"},
	    {"id": 4, "name": "Ruby"},
	    {"id": 5, "name": "BootStrap"},
	  ];
	
	  constructor(private router : Router) { }
	
	  ngOnInit() {
	  }
	
	  onSelect(department) {
	     this.router.navigate(['/department', department.id]);
	  }
	
	}

Router will catenate the strings in the param array :  

`this.router.navigate(['/department', department.id]);`

Code above will create an url : `localhost:port/department/department.id`  

### Bind the click Info
	// department-list.component.html
	<h3>Department List</h3>
	<ul class="items">
	    <li (click)="onSelect(department)" *ngFor= 'let department of departments'>
	        <span class='budge'> 
	            {{ department.id }} 
	        </span>
	            {{ department.id }}
	    </li>
	</ul>



### Get Info from Route with Rendering on Page
	// department-detail.component.ts
	import { Component, OnInit } from '@angular/core';
	import { ActivatedRoute } from '@angular/router';
	
	@Component({
	  selector: 'app-department-detail',
	  template: `
	    <h3> You selected department with id = {{departmentId}}</h3>
	  `,
	  styles: []
	})
	export class DepartmentDetailComponent implements OnInit {
	
	  public departmentId;
	
	  constructor(private route: ActivatedRoute) { }
	
	  ngOnInit() {
	    let id = parseInt(this.route.snapshot.paramMap.get('id'));
	    this.departmentId = id;
	  }
	
	}

## Logic  

First visit the home-page and will be redirected with the suffix `/department`.  

![home-page-redirected](https://i.imgur.com/fSjifCP.png)

Start analysis with the user action click. 

`  <li (click)="onSelect(department)" *ngFor= 'let department of departments'>`

When we click the items (list element with label `<ul>`) will invoke `onSlect(department)` defined in the `department-list.component.ts` :  

![click-ul-element](https://i.imgur.com/Fh7NETE.png)
	
	// department-list.component.ts
	onSelect(department) {
	 this.router.navigate(['/department', department.id]);
	} 

And then `onSelect(department)`  will navigate to the url: `localhost:port/department/department.id`.

Then the **Angular** will follow the logic we defined in the `app-routing.component.ts` file:   

	// app-routing.module.ts
	import { NgModule } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';
	import { EmployeeListComponent } from './employee-list/employee-list.component';
	import { DepartmentListComponent } from './department-list/department-list.component';
	import { PageNotFoundComponent } from './page-not-found/page-not-found.component';  // <== added
	import { DepartmentDetailComponent } from './department-detail/department-detail.component';
	
	
	
	const routes: Routes = [
	  { path: 'department/:id', component: DepartmentDetailComponent},
	  { path : '', redirectTo: '/department', pathMatch: 'full'},
	  { path : 'employee', component : EmployeeListComponent},
	  { path : 'department', component : DepartmentListComponent},
	  { path : '**', component : PageNotFoundComponent}  // <== added 
	];
	
	@NgModule({
	  imports: [RouterModule.forRoot(routes)],
	  exports: [RouterModule]
	})
	export class AppRoutingModule { }
	export const routingList : any[] = [EmployeeListComponent, 
	                                    DepartmentListComponent,
	                                    PageNotFoundComponent,
	                                    DepartmentDetailComponent
	                                  ];    
This file (`app-routing.component.ts`)  binds the url with the specific component containing logic(`.ts` file) and view (`.html` && `.css` file).  

So the **Angular** will match all the rules in the **const routes array**, and match the first one as expected :  

`{ path: 'department/:id', component: DepartmentDetailComponent},`   
 
So the view and logic then bind to the `DepartmentDetailComponent` :  

	// department-detail.component.ts
	import { Component, OnInit } from '@angular/core';
	import { ActivatedRoute } from '@angular/router';
	
	@Component({
	  selector: 'app-department-detail',
	  template: `
	    <h3> You selected department with id = {{departmentId}}</h3>
	  `,
	  styles: []
	})
	export class DepartmentDetailComponent implements OnInit {
	
	  public departmentId;
	
	  constructor(private route: ActivatedRoute) { }
	
	  ngOnInit() {
	    let id = parseInt(this.route.snapshot.paramMap.get('id'));
	    this.departmentId = id;
	  }
	
	}

In this file, we have imported and then used `ActivatedRoute` and render the view in the page :  

![activated-route](https://i.imgur.com/LGPeGN1.png)	 
