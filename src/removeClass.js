/**
 * Remove a class from the specified elements
 * 
 * This will remove the class, border, from all the h1 tags on the page.
 * 
 *     $('h1').removeClass('border');
 * 
 * You can also pass an array instead and all of the class names in the array will be removed.
 * 
 * @param {String} name The class name you want to remove
 * @param {String|Array} name The class name you want to remove or an array of class names
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('removeClass', function(name) {
	// Put this in scope
	var that = this,
		type = null,
		element = null;
	
	// Loop through all the elements
	this.each(function(e) {
		// Get the element
		element = that.find(e);
		
		// Get the type
		type = element.attribute('class') ? 'class' : 'className';
		
		// Check if name is an array
		if(name instanceof Array) {
			// Loop over the array
			that.each(function(n) {
				// Remove the class
				element.attribute(type, element.attribute(type).replace(new RegExp('(^|\\s)' + n + '($|\\s)'), ''));
			}, name);
		}
		else {
			// Remove the class
			element.attribute(type, element.attribute(type).replace(new RegExp('(^|\\s)' + name + '($|\\s)'), ''));
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
