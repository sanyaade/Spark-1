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
 *     $('p').show('fade', false, false, function() {
 *         alert('done');
 *     });
 * 
 * The two middle arguments are timeframe and easing. This works exactly the same as the animate function.
 * 
 * This function takes the originial display type into account.
 * 
 * @param {String} transition Optional name of the transition to use to show. Default transitions are: fade, slide and smooth
 * @param {Number|Boolean} timeframe How many milliseconds you wish the transition to take, pass false to default to 600
 * @param {String|Boolean} easing The easing method to use either in, out or inOut followed by one of the following: Quad, Cubic, Quart, Quint, Sine, Expo, Circ, Elastic, Back or Bounce, pass false to default to outQuad. You can also use linear
 * @param {Function} callback Optional function to be run after the transition completes
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('show', function(transition, timeframe, easing, callback) {
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
				that.transitions.show[transition](that.find(e), timeframe, easing, callback);

				// Now remove the callback so it is only called once
				callback = false;
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
			that.find(e).style('display', that.find(e).data('SparkDisplayType') || 'block');
		});
	}
	
	// Return the Spark object for chaining
	return this;
});
