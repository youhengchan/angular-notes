# [Angular] 04 - Property Binding

> **by youhengchan**  

This section will hang on to use the binding project we created in the last section - ***03 Interpolation***. 

## Attribute and Property
Attribute and property are not same thing. Attribute are defined by HTML and property are defined by DOM (Document Object Model).  

Attribute initilize DOM properties and then they are done. Attribute values cannot change once they are initialized.  

Property values can change.  

For example, We can create an HTML input component : `<input type='text' value='youheng'>`  
	
	// test.component.ts
    import { Component, OnInit } from '@angular/core';
    
    @Component({
      selector: 'app-test',
      template: `
      <h2>
    From test.component.ts <br/>
    <span class = 'welcome'>Welcome {{ 'to ' + siteUrl }} ! </span>
      </h2>
      <input type='text' value='youheng'> 
    `,
      styles: [`
      h2 {
    color : purple;
    font-size : 18px;
      }
    
      .welcome {
    background-color : rgba(124, 125, 126, 0.5);
      }
      `],
    })

	export class TestComponent implements OnInit {
	  public name = 'youheng';
	  public siteUrl = window.location.href;
	
	  constructor() {
	      this.name = 'youhenchan';
	   }
	
	  ngOnInit() {
	  }
	
	}

![input-box](https://i.imgur.com/XObF5qv.png)
  
Then inspect the input box :  
![inspect-input-box](https://i.imgur.com/MYXggr1.png)  

Now use the Google-Chrome dev tools - console : Type `$0` to visit the latest inspected elements - input box :   

![inspect-latest-element](https://i.imgur.com/gx410pH.png)  
   
Now get the value of the attribute - 'value' :  
Type `$0.getAttribute('value');` in the console, and then get the result : `"youheng"`. And get the current value of the element by `$0.value` : `"youheng"`.  

Now change the value of the input element to `'youhengchan'`, and then check these two values again : `$0.getAttribute('value');` => `"youheng"`, `$0.value` => `"youhengchan"`.

From the exp above, we can find that the attribute defined in the HTML will not be change after the initialization but the DOM property which has been set to the value of corresponding attribute can then be changed through the process.  

So, remember that the property binding is a process of binding the value to the DOM property (that's also why we call it **property binding**) and they can be changed with DOM manipulations.  

## A Property Binding Example  
	
	// test.component.ts
	import { Component, OnInit } from '@angular/core';

	@Component({
	  selector: 'app-test',
	  template: `
	              <h2>
	                From test.component.ts <br/>
	                <span class = 'welcome'>Welcome {{ 'to ' + siteUrl }} ! </span>
	              </h2>
	              <input [id] = 'myId' type='text' value='youheng'> 
	              <input [disabled] = 'inputFlag' type='text' value='youheng'> 
	            `,
	  styles: [`
	              h2 {
	                color : purple;
	                font-size : 18px;
	              }
	
	              .welcome {
	                background-color : rgba(124, 125, 126, 0.5);
	              }
	          `],
	})
	export class TestComponent implements OnInit {
	  public myId = 'hnu-201726010211';
	  public inputFlag : boolean = false;
	
	  constructor() {
	   }
	
	  ngOnInit() {
	  }
	
	}


The code above shows two implementation of the **property binding**.
### Property Binding Sytax
The syntax is really easy : `[DOM-element-name] = 'vlaue'`  
	
	<input [id] = 'myId' type='text' value='youheng'>
	
	<input [disabled] = 'inputFlag' type='text' value='youheng'>

Effect :  
![effect](https://i.imgur.com/6T67bSI.png)

## Why Do We Need Property Binding ? 

Actually, We can use **interpolation** talked in the last section to do the property binding, which means we do not need the new syntax : `[] = ''` in this section : 

	<input id = '{{ myId }}' type='text' value='youheng'>

This also works. 

But, there is a limitation to interpolation, it can only work with string values. And there are also properties like boolean properties that we may sometimes need bind too. 

**Example :**  

Consider the `disabled` property of an element, by default, It's always setted to `false`, So that the input is always enabled :  

	<input disabled = 'false' type='text' value='youheng'>  

 And in the broswer, we get the HTML element :  

	<input _ngcontent-fks-c1="" disabled="false" type="text" value="youheng">

Effect :  
![interpolation-disabled](https://i.imgur.com/hczorAM.png)

But that's not what we want, even if you try to use the interpolation as following :  

	// decleard in the class
	  public inputFlag : boolean = false;

	'''

	// called in the html clip
	 <input disabled = '{{ inputFlag }}' type='text' value='youheng'> 

Effect :  

	<input _ngcontent-wlt-c1="" type="text" value="youheng" disabled="">

Yet the effect is still disabled.   

The solution here is **property binding** that we learned in this section :  


	<input [disabled] = 'inputFlag' type='text' value='youheng'>

And this time, it works, cause **property binding** with `[]` doesn't have the type limitation of only handling string properties. Just enclose the `DOM-element-name` with square bracket and then assign the value will just work fine.  

**HINT : DO NOT MIX THE INTERPOLATION WITH PROPERTY BINDING SYNTAX**  

**ERROR** EXAMPLE : 

	<input [disabled] = '{{ inputFlag }}' type='text' value='youheng'>  

The code above will arouse an Error.

## An Alternative Syntax To Use Peoperty Binding
Use `bind-DOM-element-name` instead of `[DOM-element-name]` :   

	<input bind-disabled = 'inputFlag' type='text' value='youheng'> 


## Conclusion	
Use `[DOM-elememnt-name] = 'value'` without `{{}}` is a easy way to do property binding for both string types and none-string types. And you can also use `bind-DOM-element-name = 'value'` instead. 

 



