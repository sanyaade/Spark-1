/**
 * Shows all of the found elements
 */
Spark.extend('show', function() {
	// Initialise any required variables
	var that = this.clone();
	
	// Loop through all the elements
	this.each(function(e) {
		// Show the element with the correct display type
		that.find(e).style('display', that.find(e).data('SparkDisplayType'));
	});
});
