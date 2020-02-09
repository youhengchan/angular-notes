# [Angular] 22 - Wildcard Route and Redirecting Routes

> **by youhengchan**

## Generate a not-found-page 
`ng g c page-not-found`  

## Add the Page in routes

	// app-routing.module.ts
	import { NgModule } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';
	import { EmployeeListComponent } from './employee-list/employee-list.component';
	import { DepartmentListComponent } from './department-list/department-list.component';
	import { PageNotFoundComponent } from './page-not-found/page-not-found.component';  // <== added
	
	
	const routes: Routes = [
	  {path : 'employee', component : EmployeeListComponent},
	  {path : 'department', component : DepartmentListComponent},
	  {path : '**', component : PageNotFoundComponent}  // <== added 
	];
	
	@NgModule({
	  imports: [RouterModule.forRoot(routes)],
	  exports: [RouterModule]
	})
	export class AppRoutingModule { }
	export const routingList : any[] = [EmployeeListComponent, 
	                                    DepartmentListComponent,
	                                    PageNotFoundComponent];

So do the export and import component between `app-routing.modules.ts` and `app.modules.ts`  :  
	
	// app-routing.modules.ts
 	export const routingList : any[] = [EmployeeListComponent, 
	                                    DepartmentListComponent,
	                                    PageNotFoundComponent];

## Redirect to the home-page
![need-redirecting](https://i.imgur.com/MK1LV31.png)  

To remove this, we need redirecting.  

`{ path : '', redirectTo: '/department', pathMatch: 'prefix'},`

If we add this line into the routes array, then all the url will be redirect to the home-page (**AppComponent View**).  

If we change `prefix` into `full` :  

`{ path : '', redirectTo: '/department', pathMatch: 'full'},`  

Then only when we visit the home-page then will we be redirect to the `localhost:4200/department`.

You can change the `redirectTo: '/department'` to the `/index` then it will work fine. 


