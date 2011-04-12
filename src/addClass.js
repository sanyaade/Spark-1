/**
 * Add a class to the specified element.
 * 
 * This will add the class, border, to all the h1 tags on the page.
 * 
 *     $('h1').addClass('border');
 * 
 * @param {String} name The class name you want to add
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('addClass', function(name) {
	// Loop through all the elements
	this.each(function(e) {
		// Check if it already has the class
		if(!$(e).hasClass(name)) {
			// It doesnt, add it and trim off whitespace
			$(e).attribute('class', ($(e).attribute('class') + ' ' + name).replace(/^\s+|\s+$/i, ''));
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
