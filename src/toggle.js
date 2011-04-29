/** 
 * Toggle the visibility of the specified elements
 * 
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('toggle', function() {
	// Initialise any required variables
	var that = this,
		element = null;
	
	// Loop through the elements
	this.each(function(e) {
		// Grab the element
		element = that.find(e);
		
		// Check wether it is display none or not
		if(element.style('display') === 'none') {
			// It is, show it
			element.show();
		}
		else {
			// It is not, hide it
			element.hide();
		}
	});
	
	// Return the Spark object
	return this;
});
