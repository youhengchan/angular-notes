# [Angular] - 03 Interpolation  
> **by youhengchan**  

## Create A New Project
### Create a new project named binding :  
* Switch to the folder that you would want to start the project.  `cd dir`
* Make a new **Angular Project** by using the CMD : `ng new binding`  
* Generate the **component** - test : `ng g c test`  

And then get the following structure :  

![project-structure](https://i.imgur.com/NHEqHOU.png)   

## Interpolation In Practice

Now make some changes to the ts files (in the test component):  
	

	// test.component.ts
    import { Component, OnInit } from '@angular/core';
    
    @Component({
      selector: 'app-test',
      template: `
      <h2>
    From test.component.ts <br/>
    <span class = 'welcome'>Welcome {{ name }} ! </span>
      </h2>
    `,
      styles: [`
      div {
    color : purple;
    font-size : 8px;
      }
    
      .welcome {
    background-color : rgba(124, 125, 126, 0.5);
      }
      `],
    })
    export class TestComponent implements OnInit {
      public name = 'youheng';
      
      constructor() {
      this.name = 'youhenchan';
       }
    
      ngOnInit() {
      }
    
    }

And also for the app.component.html :  
	
	// app.component.html
    <div style='text-align: center;'>
      <h1>
    From app.component.html
      </h1>
      <app-test></app-test>
    </div>
    
    <router-outlet></router-outlet>

And Effects :  

![interpolation](https://i.imgur.com/ys24Lj4.png)
  
So, we learned the simplest way to bind the data from class in .ts file to the html file. - `{{ value }}`.   

## Other Things Angular Can Do 
* **Numbers and Strings Operation**  
Angular can also do the calculation and string concatenation like :   
`{{1 + 2}}` => rendered as `3`, And `{{ 'Hello, ' + name }}` => rendered as `Hello, value-of-name` (name is a property rendered dynamically) 
* **JS Methods and Properties**  
`{{ name.length }}` => rendered as `10` (name is setted to 'youhengchan') ;    
`{{ name.toUpperCase() }}` => rendered as `YOUHENCHAN`;
![toUpperCase](https://i.imgur.com/RGwLy0T.png)   

## Things Angular Can *Not* Do  
* **Assign values**   
Assign values in `{{}}`, like `{{name = 'youheng'}}` arouse an error.  
 
![assign-value-error](https://i.imgur.com/cNddZEJ.png)  
 
* **Access gloabl JS variables**  
Like trying to get the global value like : `window.location.href` arouse errors.   
**Hint** : To solve this, you can store them first in the class and then bind them to the HTML code :  
`<span class = 'welcome'>Welcome {{ 'to ' + siteUrl }} ! </span>`  
![local-host-binding](https://i.imgur.com/WvHOhWs.png)

## Conclusion
With interpolation, you can bind data from the class to the template.
And the syntax is the double curly braces. And within the double curly braces you have a property or an expression so you can evaluate any JavaScript expression and the result will be displayed in the browser. You can also perform string concatenation and numeric calculation. Besides, you can use JS properties and methods (includes JS embeded methods and your self-defined methods in the class) but do not assign values to the variables in the `{{}}`. To use the global variables you need to first store them in the class and then use them in the HTML file.
