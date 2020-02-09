# [Angular] - (10-12) Directives

> **by youhengchan**

## Content
* ***ngIf**
* **[ngCase]**
* **ngFor**

## Code And Explainations

	// test.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-test',
	  template:  `
	
	    <!-- *ngIf -->
	
	    <div *ngIf='displayName; then my_then_block; else my_else_block'>
	      IdioSpace Technology
	    </div>
	    <ng-template #my_then_block>
	      <h2>
	        Then, go to sleep.
	      </h2>
	    </ng-template>
	    <ng-template #my_else_block>
	      <h2>
	        Name is hidden
	      </h2>
	    </ng-template>
	
	    <!-- [ngSwitch] -->
	
	    <!-- ngSwitchCase && ngSwitchDefault -->
	
	    <div [ngSwitch]='color'>
	      <div *ngSwitchCase="'red'">  
	        You picked red color.
	      </div>
	      <div *ngSwitchCase = "'blue'">   
	        You picked blue color.
	      </div>
	      <div *ngSwitchCase = "'purple'">   
	        You picked purple color.
	      </div>
	      <div *ngSwitchDefault> Pick again </div>
	    </div>
	
	    <!-- *ngFor -->  
	    
	
	    <!-- You can not use '' to enclose the *ngFor with index as i-->
	    <!-- <div *ngFor='let color of colors; index as i'> does not work -->
	    <!--div *ngFor="let color of colors; index as i"-->
	    <div *ngFor="let color of colors; first as isFirst ; last as isLast ; index as i ; odd as isOdd ; even as isEven">  
	    <!-- Combine the *ngIf and *ngFor -->
	    <h2 *ngIf='isEven'> isEven : {{ isEven}} isOdd : {{isOdd}} isFirst : {{ isFirst }} isLast : {{ isLast }} index : {{ i }} content : {{ color }} </h2>
	    </div>
	  `,
	  styles: [`
	
	    
	  `]
	})
	export class TestComponent implements OnInit {
	  public colors : string[] = ['red', 'blue', 'green', 'yellow']; 
	  color : string = 'black';
	  displayName : boolean = true;
	  constructor() { }
	
	  ngOnInit() {
	  }
	
	}