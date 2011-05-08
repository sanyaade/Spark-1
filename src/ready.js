/**
 * Runs the specified function when the DOM is ready. This is the staple diet of any script using Spark.
 * For best results across all browsers always wrap your code within the ready function like so.
 * 
 *     Spark.ready(function() {
 *         // Your code goes here
 *     });
 * 
 * @param {Function} fn Function to be run when the DOM is ready
 */
Spark.extend('ready', function(fn) {
	// Initialise any required variables
	var that = this.clone();
	
	/**
	 * Runs the call back and sets the already run flag to true
	 */
	function ready() {
		that.find(document).data('domReady', true);
		fn();
	}
	
	if(!that.find(document).data('domReady')) {
		// Check if we can use addEventListener
		if(window.addEventListener) {
			// For all browsers except IE
			document.addEventListener('DOMContentLoaded', ready, false);
		}
		else {
			// For IE
			(function() {
				// Create the custom tag
				var tempNode = document.createElement('document:ready');

				try {
					// See if it throws errors until after it is ready
					tempNode.doScroll('left');

					// Call the function
					ready();
				}
				catch(err) {
					setTimeout(arguments.callee, 0);
				}
			}());
		}
	}
	else {
		fn();
	}
});
