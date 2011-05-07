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
		that = this,
		element = null,
		type = null;
	
	// Loop through all the elements
	this.each(function(e) {
		// Get the element
		element = that.find(e);
		
		// Check if name is an array
		if(name instanceof Array) {
			// Loop over the array
			that.each(function(n) {
				// Rerun the function
				element.addClass(n);
			}, name);
		}
		else {
			// Check if it already has the class
			if(!that.find(e).hasClass(name)) {
				// Get the type
				type = element.attribute('class') ? 'class' : 'className';
				
				// Grab the class
				c = element.attribute(type);
				
				// It doesnt, add it and trim off whitespace
				element.attribute(type, ((c) ? c + ' ' + name : name).replace(/^\s+|\s+$/i, ''));
			}
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
