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
 *     $('p').hide('fade', false, false, function() {
 *         alert('done');
 *     });
 * 
 * The two middle arguments are timeframe and easing. This works exactly the same as the animate function.
 * 
 * This function takes the originial display type into account.
 * 
 * @param {String} transition Optional name of the transition to use to hide. Default transitions are: fade, slide and smooth
 * @param {Number|Boolean} timeframe How many milliseconds you wish the transition to take, pass false to default to 600
 * @param {String|Boolean} easing The easing method to use either in, out or inOut followed by one of the following: Quad, Cubic, Quart, Quint, Sine, Expo, Circ, Elastic, Back or Bounce, pass false to default to outQuad. You can also use linear
 * @param {Function} callback Optional function to be run after the transition completes
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('hide', function(transition, timeframe, easing, callback) {
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
				that.transitions.hide[transition](that.find(e), timeframe, easing, callback);
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
