/**
 * Loops through all of the elements contained in the Spark object passing them to a specified callback function.
 * You can also pass an array or object as the second argument and it will loop through that instead.
 * 
 * This basically handles looping for you, if you pass it an object then it will perform a `hasOwnProperty` check before passing it to your callback function.
 * 
 * To loop through all of the p tags on the page and turn them red, you would use the following code.
 * 
 *     $('p').each(function(e) {
 *         e.style.color = '#FF0000';
 *     });
 * 
 * To loop through an array or object you just pass the variable in question to the each function as the second argument. Here is an example of passing an array.
 * 
 *     Spark.each(function(e) {
 *         console.log(e);
 *     }, ['hello', 'world']);
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
			fn(target[i], i);
		}
	}
	else {
		// Loop through as an object
		for(i in target) {
			if(target.hasOwnProperty(i) === true) {
				fn(target[i], i);
			}
		}
	}
	
	// Return the Spark object for chaining
	return this;
});
