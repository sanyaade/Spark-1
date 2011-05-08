/**
 * Checks if an element has the specified class.
 * 
 * For example, this will return true, given that there is a div with a class of focus on the page.
 * 
 *     $('div.focus').hasClass('focus');
 * 
 * You can also pass an array instead and all of the class names in the array will be checked for.
 * 
 * All class names must be found for it to return true
 * 
 * @param {String|Array} name The class name you want to search for or an array of class names. If you pass an array, all will have to match
 * @returns {Boolean} Will return true if it has the class or false if it does not
 */
Spark.extend('hasClass', function(name) {
	// Initialise any required variables
	var e = null,
		found = true,
		element = null,
		type = null;
	
	// Make sure we have some elements
	if(this.length !== 0) {
		// Get the first element
		e = this[0];
		
		// Put it in an instance
		element = this.find(e);
	}
	else {
		// We have nothing, return false
		return false;
	}
	
	// Get the type
	type = element.attribute('class') ? 'class' : 'className';
	
	// Check if name is an array
	if(name instanceof Array) {
		// Loop over the array
		this.each(function(n) {
			// Check for the class
			if(!new RegExp('(^|\\s)' + n + '($|\\s)').test(element.attribute(type))) {
				// If not found set found to false
				found = false;
			}
		}, name);
		
		// Return found
		return found;
	}
	else {
		// Check for the class
		return new RegExp('(^|\\s)' + name + '($|\\s)').test(element.attribute(type));
	}
});
