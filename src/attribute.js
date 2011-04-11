/**
 * The attribute function is used to get or set attributes.
 * It takes either one or two arguments, if you pass a name and a value like so.
 * 
 *     $('img').attribute('alt', 'An image');
 * 
 * Then it will assign 'An image' to the alt attribute of all img tags on the page.
 * 
 * You can then retrieve the alt value of the first image on the page like so.
 * 
 *     $('img').attribute('alt');
 * 
 * If you have multiple values to set then you can use an object like so.
 * 
 *     $('img').attribute({
 *         alt: 'An image',
 *         title: 'Image title'
 *     });
 * 
 * @param {String|Object} name Either an object of attributes or the name of the required attribute
 * @param {String} value The value to assign to the name if you passed a string, if not passed then it returns the value of the previous name
 * @returns {Object|String} If you are setting it will return the Spark object for chaining, if you are getting then it will return the retrieved value
 */
Spark.extend('attribute', function(name, value) {
	// Initialise any required variables
	var i = null,
		n = null;
	
	// Check what kind of variable name is
	if(typeof name === 'string') {
		// Check if they passed a value
		if(typeof value === 'string') {
			// Loop through all elements and assign the attribute
			for(i = 0; i < this.length; i++) {
				this[i].setAttribute(name, value);
			}
		}
		else {
			// Get the attribute
			return this[0].getAttribute(name);
		}
	}
	else if(typeof name === 'object') {
		// Loop through all the attributes
		for(n in name) {
			// Check that it is not a prototype
			if(name.hasOwnProperty(n)) {
				// Loop through all elements and assign the attribute
				for(i = 0; i < this.length; i++) {
					this[i].setAttribute(n, name[n]);
				}
			}
		}
	}
	
	// Return the Spark object to allow chaining
	return this;
});
