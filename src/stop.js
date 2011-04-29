/**
 * Stops all animations for the specified elements
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
	});
	
	// Return the Spark object
	return this;
});