/**
 * Loops through all of the elmenets contained in the Spark object passing the to a function
 * 
 * @param {Function} fn Function for the current element to be passed to
 * @param {Array|Object} data Optional data to be looped over, if not passed then it uses the elements
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('each', function(fn, data) {
	// Initialise any required variables
	var i = null,
		target = null;
	
	// Check if there is any data
	if(typeof data === 'undefined') {
		// Theres no data, check for elements
		if(typeof this.elements === 'undefined') {
			// There is nothing to use, return false
			return false;
		}
		else {
			// There are some elelements, assign it to target
			target = this.elements;
		}
	}
	else if(typeof data === 'object') {
		// We have data! Assign it to target
		target = data;
	}
	
	// Check if target is an array or object
	if(target instanceof Array) {
		// Loop through as an array
		for(i = 0; i < target.length; i++) {
			fn.apply(target[i]);
		}
	}
	else {
		// Loop through as an object
		for(i in target) {
			if(target.hasOwnProperty(i) === true) {
				fn.apply(target[i]);
			}
		}
	}
	
	// Return the Spark object for chaining
	return this;
});
