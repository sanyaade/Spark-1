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
	
	// Check for a transition
	if(typeof transition === 'string') {
		// Show it with the specified transition
		// Check for the transition
		if(typeof this.transitions.show[transition] === 'function') {
			// Run the transition
			this.transitions.show[transition]();
		}
		else {
			// If it does not exist, default to just showing it
			this.show();
		}
	}
	else {
		// Just show it
		// Loop through all the elements
		this.each(function(e) {
			// Show the element with the correct display type
			that.find(e).style('display', that.find(e).data('SparkDisplayType'));
		});
	}
	
	// Return the Spark object for chaining
	return this;
});
