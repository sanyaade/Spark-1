/**
 * Hides all of the found elements
 * 
 * For example, to hide all p tags on the page, you would use the following line
 * 
 *     $('p').hide();
 * 
 * This function takes the originial display type into account.
 * 
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('hide', function() {
	// Initialise any required variables
	var that = this;
	
	// Loop through all the elements
	this.each(function(e) {
		// Make sure it is already shown
		if(that.find(e).style('display') !== 'none') {
			// Store the original display type and hide the element
			that.find(e).data('SparkDisplayType', that.find(e).style('display')).style('display', 'none');
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
