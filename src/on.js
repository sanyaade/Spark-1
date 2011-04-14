/**
 * Add an event listener to the found elements
 * 
 * @param {String} name Name of the event you want to listen for
 * @param {Function} fn Function to be run when the event occurs
 * @param {Boolean} stopBubble If true then event bubbling will be prevented
 */
Spark.extend('on', function(name, fn, stopBubble) {
	function fixEvent(e) {
		// Initalise any required variables
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
		if(targ.nodeType === 3) {
			targ = targ.parentNode;
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
				offsetX += obj.offsetLeft;
				offsetY += obj.offsetTop;
			} while(obj = obj.offsetParent);
			
			e.offsetX = offsetX;
			e.offsetY = offsetY;
		}
		
		// Return the fixed event object
		return e;
	}
	
	function runCallback(e) {
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
		
	});
	
	// Return the Spark object for chaining
	return this;
});
