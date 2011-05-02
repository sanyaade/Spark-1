/**
 * Stops all animations for the specified elements
 * 
 * For example, to stop the animation of all div's on the page, you would use the following line
 * 
 *     $('div').stop();
 * 
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('stop', function() {
	// Initialise any required variables
	var that = this,
		element = null;
	
	// Loop through all of the elements
	this.each(function(e) {
		// Grab the element
		element = that.find(e);
		
		// Loop through all of the timeouts
		that.each(function(t) {
			clearTimeout(t);
		}, element.data('SparkTimeouts'));
		
		// Reset the array
		element.data('SparkTimeouts', []);
		
		// Reset the animations array
		element.data('SparkAnimations', []);
	});
	
	// Return the Spark object
	return this;
});
