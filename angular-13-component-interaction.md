# [Angular] - 13 Component Interaction 

> **by youhengchan** 

The components has two kinds of relationships : **parental** && **filial** && **siblings**  

## Example Structure    
Parental Component : `appComponent`  
Filial Component : `testComponent`

## Son to Parent 
### Files :   
* `test.componnet.ts (embeded with html and css)`  
* `app.component.ts`  
* `app.component.html`  

### Solution 1 : Code && Explanation 
The first step to take before we transmit the data from filial component to parental component is to import the corresponding module. Here we import the decorator `Output` and class `EventEmitter` from `@angular/core`.  

    import { Component, OnInit, Output, EventEmitter } from '@angular/core';

The `Output` element is used as a decorator to decorate the property defined in the class, and `EventEmitter` is for emitting the data from the child component (here is `testComponent`) to parental components (here we use `appComponent` to  receive data).

And then we define the data to be transmitted `toParentData`. To simplify the code, I just use a string here as example, you can use other complex data struture like class or something else.  
	
	public toParentData : any = 'To parent';
	  
Next, we instantiate the `EventEmitter` decorated by `@Output()`: 
	
	@Output() public childEvent = new EventEmitter();

Now comes the time to set triggers to emit the data, just define a method to call the emit method of the EventEmitter instance - `childEvent` :  

	setFire() : void {
    	this.childEvent.emit(this.toParentData);
  	}

And bind the mothed to the event - `click` :  

	template:  `
	    <button (click)='setFire()'>Send Data</button>
	  `,


    
The final `test.component.ts` file looks like :    
	
	// test.componnet.ts
	import { Component, OnInit, Output, EventEmitter } from '@angular/core';
	
	@Component({
	  selector: 'app-test',
	  template:  `
	    <button (click)='setFire()'>Send Data</button>
	  `,
	  styles: [`
	
	    
	  `]
	})
	export class TestComponent implements OnInit {
	  
	  public toParentData : any = 'To parent';
	  @Output() public childEvent = new EventEmitter();
	
	  constructor() { }
	
	  ngOnInit() {
	  }
	
	  setFire() : void {
	    this.childEvent.emit(this.toParentData);
	  }
	
	
	}

After we finished the `test.component.ts` file, we then have to get the data in the parental component `appComponent`.

Then we will handle the `app.component.html` file.

To begin with, we will bind the event `childEvent` to the corresponding label - `<app-test>`, we can capture the event by `$event` and the assign it to the property we will defined later in the `app.component.ts` - message :  

	<app-test (childEvent)='message=$event'></app-test>

Then, we gonna declear the property - `message` in the class (in the `app.component.ts` file): 
 
	public message;

And by now, the `app.component.ts` should look like :  

	// app.component.ts
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	  title = 'structural-directives';
	  public message;  // Added the property 
	}

And we gonna move to the `app.component.html` file and print the message by using interpolation - `{{ }}`: 

	// app.component.html
	<div>
	    <p>
	        message : {{ message }}
	    </p>
	</div>
	
	<app-test (childEvent)='message=$event'></app-test>
	
	<router-outlet></router-outlet> 

After we click the button, the message sent fom testComponent should then be displayed in the browser :  

![Before we click the send button](https://i.imgur.com/Q5zMCJc.png)  

![After we click the send button](https://i.imgur.com/FDdcuwQ.png)  
  
### Solution 2 : Code && Explanation
There are actually an easier way for transmitting the data from child to parent: use `@ViewChild('xxx')` decorator.  

Initially, we import the child label in the parental `.html` file. And tag the label with name - `labelName`.    

	// parent.component.html
	<son-label #labelName><son-label> 

In the corresponding parental `.ts` file, we then import the `ViewChild` module from the `@angular/core` : `import {ViewChild} from '@angular/core;`.

And then bind the child with the pre-defined name : `labelName` :  

`@ViewChild('labelName') child : any;`  

Finally, we can then use the child component in the parental `.ts` file :  

	// parent.component.ts
	parentMethod() {
		this.child.childMethod();	
	}    
  

  

 
## Parent to Son
### Files :   
* `test.componnet.ts (embeded with html and css)`  
* `app.component.ts`  
* `app.component.html`  

The parent to son transmission is much simpler, coz we can easily bind them in the `app.componet.html` file without creating the `EventEmitter`.  

The first step is binding the data that we wanna send to the corresponding label of the filial component (here is `testComponent`) - in the `<app-test>` :  

	<app-test (childEvent)='message=$event' [parentDataName]='personInfo'></app-test>  

As you can see here, we bind the data `personInfo` that we will declear in a minute in the class of `app.component.ts` file. `parentDataName` is a **custum property** that we bind to the filial component (`testComponent`).  

Now just declear the `personInfo` in the `app.component.ts` :  
	
	// app.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	  title = 'structural-directives';
	  public message;
	  public personInfo = {
	    name : 'youheng',
	    age : 20,
	  };
	}

Now grab the data sent from parental component in the filial component (decorated with `@Input('parentDataName')` and rename it as `info`):  

	@Input('parentDataName') public info;

**Hint :** If you do not want change the name, just use the following style :  

	@Input() public parentDataName; 

By adding the line above in the `test.component.ts` file, the class in `test.component.ts` has been updated :  

	export class TestComponent implements OnInit {
	  // Get the data send from parent Component - appComponent
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

And then use is in the embeded html which also included in the `test.component.ts`  :  

	import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
	
	@Component({
	  selector: 'app-test',
	  template:  `
	    <button (click)='setFire()'>Send Data</button>
	    <h2 *ngIf='info'> hello, parentData : {{ info.name.toString() + ' ' + info.age.toString() }} </h2>
	  `,
	  styles: [`
	
	    
	  `]
	})
	export class TestComponent implements OnInit {
	  // Get the data send from parent Component - appComponent
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

Effect : 

![final-effect](https://i.imgur.com/PMMvSm9.png)
	  
	  
## Siblings
* **LocalStorage**
* **Services** 
