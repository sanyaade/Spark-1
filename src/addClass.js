/**
 * Add a class to the specified elements
 * 
 * This will add the class, border, to all the h1 tags on the page.
 * 
 *     $('h1').addClass('border');
 * 
 * @param {String} name The class name you want to add
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('addClass', function(name) {
	// Initialise any required variables
	var c = null;
	
	// Loop through all the elements
	this.each(function(e) {
		// Check if it already has the class
		if(!$(e).hasClass(name)) {
			// Grab the class
			c = $(e).attribute('class');
			
			// It doesnt, add it and trim off whitespace
			$(e).attribute('class', ((c) ? c + ' ' + name : name).replace(/^\s+|\s+$/i, ''));
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
