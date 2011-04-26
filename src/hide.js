/**
 * Hides all of the found elements
 */
Spark.extend('hide', function() {
	// Initialise any required variables
	var that = this.clone();
	
	// Loop through all the elements
	this.each(function(e) {
		// Store the original display type and hide the element
		that.find(e).data('SparkDisplayType', that.find(e).style('display')).style('display', 'none');
	});
	
	// Return the Spark object for chaining
	return this;
});
