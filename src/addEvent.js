/**
 * Add an event listener to the found elements.
 * 
 * To set an event you must specify an event type and callback. The callback will be passed the event object as an argument.
 * 
 * If you wanted to set a listener for click event on all p tags then you would use the following line.
 * 
 *     $('p').addEvent('click', function(e) {
 *         // Code to handle the click event goes here
 *     });
 * 
 * If you return false from your callback then the default action will be prevented. For instance, this line would cause all links on the page to stop working.
 * 
 *     $('a').addEvent('click', function(e) { return false });
 * 
 * The function also takes an optional third argument, `stopBubble`.
 * 
 * If true then event bubbling will be prevented.
 * 
 * @param {String} type Name of the event you want to listen for
 * @param {Function} fn Function to be run when the event occurs
 * @param {Boolean} stopBubble If true then event bubbling will be prevented
 */
Spark.extend('addEvent', function(type, fn, stopBubble) {
	function fixEvent(e) {
		// Initialise any required variables
		var posx = 0,
			posy = 0,
			obj = null,
			offsetX = 0,
			offsetY = 0;
		
		// Fix IE's wrong association of the target element
		if(e.srcElement) {
			e.target = e.srcElement;
		}
		
		// Fix Safaris problem with selecting the wrong node type
		if(e.target.nodeType === 3) {
			e.target = e.target.parentNode;
		}
		
		// Make sure we have keyCode, and not which
		if(e.which) {
			e.keyCode = e.which;
		}
		
		// Fix IE's pageX/Y locations
		if(e.clientX || e.clientY) {
			e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		
		// Fix the offsetX/Y in Firefox
		obj = e.target;
		if(obj.offsetParent) {
			do {
				obj = obj.offsetParent;
				offsetX += obj.offsetLeft;
				offsetY += obj.offsetTop;
			} while(obj.offsetParent);
			
			e.offsetX = offsetX;
			e.offsetY = offsetY;
		}
		
		// Return the fixed event object
		return e;
	}
	
	function runCallback(e) {
		// Stop bubbling if required
		if(stopBubble) {
			e.cancelBubble = true;
			if(e.stopPropagation) {
				e.stopPropagation();
			}
		}
		
		// Run the callback and check if it returned false
		if(fn(fixEvent(e)) === false) {
			// If so then prevent default
			if(e.preventDefault) {
				e.preventDefault();
			}
			else {
				e.returnValue = false;
			}
		}
	}
	
	// Loop through all the elements
	this.each(function(e) {
		// Check if the browser supports addEventListener or attachEvent and use it
		if(e.addEventListener) {
			// Assign event
			e.addEventListener(type, runCallback, false);
		}
		else {
			// Assign event
			e.attachEvent('on' + type, runCallback);
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
