/**
 * Shows all of the found elements
 * 
 * For example, to show all p tags on the page, you would use the following line
 * 
 *     $('p').show();
 * 
 * To fade the elements in, you would specify the fade transition as the optional argument
 * 
 *     $('p').show('fade');
 * 
 * You can also pass a function as the second argument to be run when the transition completes, like so
 * 
 *     $('p').show('fade', function() {
 *         alert('done');
 *     });
 * 
 * This function takes the originial display type into account.
 * 
 * @param {String} transition Optional name of the transition to use to show. Default transitions are: fade, slide and smooth
 * @param {Function} callback Optional function to be run after the transition completes
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('show', function(transition, callback) {
	// Initialise any required variables
	var that = this;
	
	// Check for a transition
	if(typeof transition === 'string') {
		// Show it with the specified transition
		// Check for the transition
		if(typeof this.transitions.show[transition] === 'function') {
			// Loop through all of the elements
			this.each(function(e) {
				// Run the transition
				that.transitions.show[transition](that.find(e), callback);
			});
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
