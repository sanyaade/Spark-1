/**
 * Add a class to the specified elements
 * 
 * This will add the class, border, to all the h1 tags on the page.
 * 
 *     $('h1').addClass('border');
 * 
 * You can also pass an array instead and all of the class names in the array will be added.
 * 
 * @param {String|Array} name The class name you want to add or an array of class names
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('addClass', function(name) {
	// Initialise any required variables
	var c = null,
		that = this;
	
	// Loop through all the elements
	this.each(function(e) {
		// Check if name is an array
		if(name instanceof Array) {
			// Loop over the array
			that.each(function(n) {
				// Rerun the function
				that.find(e).addClass(n);
			}, name);
		}
		else {
			// Check if it already has the class
			if(!that.find(e).hasClass(name)) {
				// Grab the class
				c = that.find(e).attribute('class');
				
				// It doesnt, add it and trim off whitespace
				e.className = ((c) ? c + ' ' + name : name).replace(/^\s+|\s+$/i, '');
			}
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
