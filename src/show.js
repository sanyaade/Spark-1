/**
 * Shows all of the found elements
 * 
 * For example, to show all p tags on the page, you would use the following line
 * 
 *     $('p').show();
 * 
 * This function takes the originial display type into account.
 * 
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('show', function(transition) {
	// Initialise any required variables
	var that = this;
	
	// Loop through all the elements
	this.each(function(e) {
		// Show the element with the correct display type
		that.find(e).style('display', that.find(e).data('SparkDisplayType'));
	});
	
	// Return the Spark object for chaining
	return this;
});
