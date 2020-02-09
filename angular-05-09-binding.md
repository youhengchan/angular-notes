# Angular [05-09] Binding

> **by youhengchan**  

## Content
* **Class Binding**
* **Style Binding**
* **Event Binding**
* **Template**
* **Two Way Binding**

## Code Examples With explainations
	
	// test.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-test',
	  template: `
				  <!-- Class Binding -->
	              <h2 class='text-success'>
	                From test.component.ts <br/>
	                <span> Welcome {{ 'to ' + siteUrl }} ! </span>
	              </h2>
	              <input [id] = 'myId' type='text' value='youheng'> 
	              <input disabled = 'false' type='text' value='youheng'> 
	              <h2 class = 'text-success'>class binding</h2>
	              <!-- class binding -->
	              <h2 [class] = 'specialClass'>class binding</h2>
	              <h2 [class.text-danger] = 'hasError'>hasError</h2>
	              <h2 [ngClass] = 'messageClasses'>ngClassExample</h2>
	              <!-- Style binding -->
	              <h2 [style.color]="hasError ? 'red' : 'green'"> Style Binding </h2>
	              <h2 [style.color]="highLightColor"> Style Binding2 </h2>
	              <h2 [ngStyle]='titleStyles'>ngStyle</h2>            
	              <!-- event binding -->
	              <button (click)='onClick($event)'> Greet </button>
	              <!-- cannot use abbr of event => e, namely, $(e) does not work -->
	              <div *ngIf='greeting'>
	                <p>{{ 'Not null  ' + greeting }} </p>
	              </div>
	              <button (click)='greeting="welcome, youhengchan"'>greet1</button>
	              <!-- The code above assign the value of the greeting to 'welcome, youhengchan'-->
	
	              <!-- template reference variable -->
	              <input #myInput type='text'>
	              
	              <button (click)='logMessage(myInput, $event)'>Log</button>
	              <!-- We can use data binding by using interpolation ,
	              property-binding, class-binding, style-binding;
	              and define the event enclosed by parentheses to implement 
	              event binding.
	              Angular give us a way that combined these two : 
	              two-way binding allows us to update a property 
	              and at the same time display the value of that property
	              And for two-way binding, angular provides another directive
	              namely the ngModel directive. 
	              -->
	              <input [(ngModel)]='name' type='text'>
	              <div *ngIf='name'>
	                <p>
	                  {{ name }}
	                </p>
	              </div>
	              
	
	              
	              
	              
	              `,
	  styles: [`
	              .text-success {
	                color : green;
	                background-color : pink;
	              }
	
	              .text-danger {
	                color : red;
	              }
	
	              .text-special {
	                font-style : italic;
	              }
	          `],
	})
	export class TestComponent implements OnInit {
	  public name = '';
	  public siteUrl = window.location;
	  public myId = 'hnu-201726010211';
	  public inputFlag : boolean = false;
	  public specialClass = 'text-special';
	  public hasError = true;
	  public isSpecial = true;
	  public highLightColor = 'orange';
	  public messageClasses = {
	    'text-success' : !this.hasError,
	    'text-danger' : this.hasError,
	    'text-special' : this.isSpecial
	  };
	  
	  public titleStyles = {
	    color: 'blue',
	    fontStyle: 'italic',
	  };
	
	  public greeting = '';
	
	
	  constructor() {
	    this.setHasError(false);
	   }
	
	  ngOnInit() {
	  }
	
	  setHasError(flag : boolean) {
	    this.hasError = flag;
	  }
	
	  onClick(event) {
	    alert('Welcome , youheng');
	    this.greeting = 'Welcome';
	    console.log(event.toElement);
	  }
	
	  logMessage (input, e) {
	    console.log(input.value);
	    console.log(e);
	  }
	
	}
