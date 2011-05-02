/**
 * Hides all of the found elements
 * 
 * For example, to hide all p tags on the page, you would use the following line
 * 
 *     $('p').hide();
 * 
 * To fade the elements out, you would specify the fade transition as the optional argument
 * 
 *     $('p').hide('fade');
 * 
 * You can also pass a function as the second argument to be run when the transition completes, like so
 * 
 *     $('p').hide('fade', function() {
 *         alert('done');
 *     });
 * 
 * This function takes the originial display type into account.
 * 
 * @param {String} transition Optional name of the transition to use to hide. Default transitions are: fade, slide and smooth
 * @param {Function} callback Optional function to be run after the transition completes
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('hide', function(transition, callback) {
	// Initialise any required variables
	var that = this;
	
	// Check for a transition
	if(typeof transition === 'string') {
		// Hide it with the specified transition
		// Check for the transition
		if(typeof this.transitions.hide[transition] === 'function') {
			// Loop through all of the elements
			this.each(function(e) {
				// Run the transition
				that.transitions.hide[transition](that.find(e), callback);
			});
		}
		else {
			// If it does not exist, default to just hiding it
			this.hide();
		}
	}
	else {
		// Loop through all the elements
		this.each(function(e) {
			// Make sure it is already shown
			if(that.find(e).style('display') !== 'none') {
				// Store the original display type and hide the element
				that.find(e).data('SparkDisplayType', that.find(e).style('display')).style('display', 'none');
			}
		});
	}
	
	// Return the Spark object for chaining
	return this;
});
