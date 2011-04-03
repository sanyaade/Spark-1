/**
 * Runs the specified function when the DOM is ready
 * 
 * @param {Function} fn Function to be run when the DOM is ready
 */
Spark.extend('ready', function(fn) {
	// Check if we can use addEventListener
	if(window.addEventListener) {
		// For all browsers except IE
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else {
		// For IE
		(function(){
			// Check IE's proprietary DOM members
			if(!document.uniqueID && document.expando) {
				return;
			}
			
			// Create the custom tag
			var tempNode = document.createElement('document:ready');
			
			try {
				// See if it throws errors until after it is ready
				tempNode.doScroll('left');
				
				// Call ready
				fn();
			}
			catch(err) {
				setTimeout(arguments.callee, 0);
			}
		})();
	}
});
