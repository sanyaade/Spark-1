/**
 * The property function is used to get or set properties.
 * Not to be confused with attributes, if you are trying to get the value for instance attribute will get what it says in the html tag, property will get the actual value.
 * 
 * It takes either one or two arguments, if you pass a name and a value like so.
 * 
 *     $('img').property('title', 'An image');
 * 
 * Then it will assign 'An image' to the title property of all img tags on the page.
 * 
 * You can then retrieve the alt value of the first image on the page like so.
 * 
 *     $('img').property('title');
 * 
 * If you have multiple values to set then you can use an object like so.
 * 
 *     $('img').property({
 *         alt: 'An image',
 *         title: 'Image title'
 *     });
 * 
 * @param {String|Object} name Either an object of properties or the name of the required property
 * @param {String} value The value to assign to the name if you passed a string, if not passed then it returns the value of the previous name
 * @returns {Object|String} If you are setting it will return the Spark object for chaining, if you are getting then it will return the retrieved value
 */
Spark.extend('property', function(name, value) {
	// Set up that to put this in scope
	var that = this;
	
	// Check what kind of variable name is
	if(typeof name === 'string') {
		// Check if they passed a value
		if(typeof value === 'string') {
			// Loop through all elements and assign the property
			this.each(function(e) {
				e[name] = value;
			});
		}
		else {
			// Get the property
			return this[0][name];
		}
	}
	else if(typeof name === 'object') {
		// Loop through all the properties
		this.each(function(v, n) {
			// Loop through all elements and assign the property
			that.each(function(e) {
				e[n] = v;
			});
		}, name);
	}
	
	// Return the Spark object to allow chaining
	return this;
});
