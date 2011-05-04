/**
 * Remove a class from the specified elements
 * 
 * This will remove the class, border, from all the h1 tags on the page.
 * 
 *     $('h1').removeClass('border');
 * 
 * @param {String} name The class name you want to remove
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('removeClass', function(name) {
	// Put this in scope
	var that = this;
	
	// Loop through all the elements
	this.each(function(e) {
		// Check if name is an array
		if(name instanceof Array) {
			// Loop over the array
			that.each(function(n) {
				// Remove the class
				e.className = e.className.replace(new RegExp('(^|\\s)' + n + '($|\\s)'), '');
			}, name);
		}
		else {
			// Remove the class
			e.className = e.className.replace(new RegExp('(^|\\s)' + name + '($|\\s)'), '');
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
