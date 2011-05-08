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
	// Set up that to put this in scope
	var that = this;
	
	// Check what kind of variable name is
	if(typeof name === 'string') {
		// Check if they passed a value
		if(typeof value === 'string') {
			// Loop through all elements and assign the attribute
			this.each(function(e) {
				e.setAttribute(name, value);
			});
		}
		else {
			// Make sure we have some elements
			if(this.length !== 0) {
				// Get the attribute
				return this[0].getAttribute(name);
			}
		}
	}
	else if(typeof name === 'object') {
		// Loop through all the attributes
		this.each(function(v, n) {
			// Loop through all elements and assign the attribute
			that.each(function(e) {
				e.setAttribute(n, v);
			});
		}, name);
	}
	
	// Return the Spark object to allow chaining
	return this;
});
