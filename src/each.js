/**
 * Loops through all of the elmenets contained in the Spark object passing the to a function
 * 
 * @param {Function} fn Function for the current element to be passed to
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('each', function(fn) {
	// Initialise any required variables
	var i = null;
	
	// Loop through all elements
	for(i = 0; i < this.length; i++) {
		// Pass the element to the function
		fn(this[i]);
	}
	
	// Return the Spark object for chaining
	return this;
});
