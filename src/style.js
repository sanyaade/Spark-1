/**
 * The style function is used to get or set styles.
 * It takes either one or two arguments, if you pass a name and a value like so.
 * 
 *     $('img').style('width', '100px');
 * 
 * Then it will make all images on the page 100px wide.
 * 
 * You can then retrieve the width of the first image on the page like so.
 * 
 *     $('img').style('width');
 * 
 * If you have multiple styles to set then you can use an object like so.
 * 
 *     $('img').style({
 *         width: '100px',
 *         height: '50px'
 *     });
 * 
 * @param {String|Object} name Either an object of styles or the name of the required style
 * @param {String} value The value to assign to the style if you passed a string, if not passed then it returns the style of the previous name
 * @returns {Object|String} If you are setting it will return the Spark object for chaining, if you are getting then it will return the retrieved style
 */
Spark.extend('style', function(name, value) {
	// Initialise any required variables
	var i = null,
		n = null;
	
	// Check what kind of variable name is
	if(typeof name === 'string') {
		// Check if they passed a value
		if(typeof value === 'string') {
			// Loop through all elements and assign the style
			for(i = 0; i < this.length; i++) {
				this[i].style[name] = value;
			}
		}
		else {
			// Get the style
			return this[0].style[name];
		}
	}
	else if(typeof name === 'object') {
		// Loop through all the styles
		for(n in name) {
			// Check that it is not a prototype
			if(name.hasOwnProperty(n)) {
				// Loop through all elements and assign the style
				for(i = 0; i < this.length; i++) {
					this[i].style[n] = name[n];
				}
			}
		}
	}
	
	// Return the Spark object to allow chaining
	return this;
});
