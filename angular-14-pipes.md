# [Angular] - 14 pipes 

> **by youhengchan**  

Just used the last sction's project.

# Code With Explanation 
	
	// test.component.ts
	import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
	
	@Component({
	  selector: 'app-test',
	  template:  `
	    <button (click)='setFire()'>Send Data</button>
	    <h2 *ngIf='info'> hello, parentData : {{ info.name.toString() + ' ' + info.age.toString() }} </h2>
	   
		<!-- pipes : lowercase && uppercase -->
	    <h2> {{ name | lowercase | uppercase }} </h2>
	    <!-- titleCase -->
	    <h2> {{ pipeMessage | titlecase }} </h2>
	    <!-- slice pipe -->
	    <h2> {{ pipeMessage | slice:-3 }} </h2>
	    <h2> {{ pipeMessage | slice:3:5 }} </h2>
	    <!-- json pipe : give you the json representation of an object -->
	    <h2> {{ info | json }} </h2>
	
	    <!-- pipes for number -->
	    <!-- explaination : '1.2-3 '
	        '1' for the minimum length of integer part
	        '.' for the point
	        '2-3' stands for decimal place
	        '2' for minimum minimum length
	        '3' for the maximum length
	        do the round when > max
	        do the fill 0 when < min(decimal part) | fix(int part)
	     -->
	    <h2> {{5.678 | number: '1.2-3'}} </h2>
	    <h2> {{5.678 | number: '3.4-5'}} </h2>
	    <h2> {{5.678 | number: '3.1-2'}} </h2>
	
	  <!-- percent pipe -->
	  <h2> {{ 5.678 | percent }} </h2>
	  <h2> {{ 0.678 | percent }} </h2>
	
	  <!-- currency pipe -->
	  <h2> {{ 0.678 | currency : 'GBP' }} </h2>
	  <h2> {{ 0.678 | currency : 'CNY' }} </h2>
	  <h2> {{ 0.678 | currency : 'EUR' }} </h2>
	  <h2> {{ 0.678 | currency : 'CNY' : 'code' }} </h2>
	
	  <!-- date pipes  -->
	  <h2> {{ date }} </h2>
	  <h2> {{ date | date : 'short' }} </h2>
	  <h2> {{ date | date : 'shortDate' }} </h2>
	  <h2> {{ date | date : 'shortTime' }} </h2>
	  <h2> {{ date | date : 'mediumTime' }} </h2>
	  <h2> {{ date | date : 'mediumDate' }} </h2>
	  <h2> {{ date | date : 'longTime' }} </h2>
	  <h2> {{ date | date : 'longDate' }} </h2>
	  
	  `,
	  styles: [`
	
	    
	  `]
	})
	export class TestComponent implements OnInit {
	  // Get the data send from parent Component - appComponent
	  public date = new Date();
	  public name = 'yOuHeng';
	  public pipeMessage = 'pipe-Message here';
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
	  