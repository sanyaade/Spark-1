/**
 * Hides all of the found elements
 */
Spark.extend('hide', function() {
	// Initialise any required variables
	var that = this.clone();
	
	// Loop through all the elements
	this.each(function(e) {
		// Store the original display type
		that.find(e).data('SparkDisplayType', that.find(e).style('display'));
	});
	
	// Hide the element
	this.style('display', 'none');
});
