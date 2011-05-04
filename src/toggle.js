/** 
 * Toggle the visibility of the specified elements
 * 
 * For example, to toggle the visibility of all p tags on the page, you would use the following line
 * 
 *     $('p').toggle();
 * 
 * To fade the elements in, you would specify the fade transition as the optional argument
 * 
 *     $('p').show('fade');
 * 
 * You can also pass a function as the second argument to be run when the transition completes, like so
 * 
 *     $('p').toggle('fade', false, false, function() {
 *         alert('done');
 *     });
 * 
 * The two middle arguments are timeframe and easing. This works exactly the same as the animate function.
 * 
 * This function takes the original display type into account.
 * 
 * @param {String} transition Optional name of the transition to use to toggle. Default transitions are: fade, slide and smooth
 * @param {Number|Boolean} timeframe How many milliseconds you wish the transition to take, pass false to default to 600
 * @param {String|Boolean} easing The easing method to use either in, out or inOut followed by one of the following: Quad, Cubic, Quart, Quint, Sine, Expo, Circ, Elastic, Back or Bounce, pass false to default to outQuad. You can also use linear
 * @param {Function} callback Optional function to be run after the transition completes
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('toggle', function(transition, timeframe, easing, callback) {
	// Initialise any required variables
	var that = this,
		element = null;
	
	// Loop through the elements
	this.each(function(e) {
		// Grab the element
		element = that.find(e);
		
		// Check whether it is display none or not
		if(element.style('display') === 'none') {
			// It is, show it
			element.show(transition, timeframe, easing, callback);
		}
		else {
			// It is not, hide it
			element.hide(transition, timeframe, easing, callback);
		}
		
		// Now remove the callback so it is only called once
		callback = false;
	});
	
	// Return the Spark object
	return this;
});
