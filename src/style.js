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
	
	/**
	 * Turns a hyphen seperated style name into a camel case one
	 * 
	 * @param {String} style The style name to convert
	 * @returns {String} The camel case version of the string
	 * @private
	 */
	function camelStyle(style) {
		// Check if we need to camel case
		if(style.indexOf('-') !== -1) {
			// Return the camel cased string
			return style.replace(/-([a-z])/gi, function(s, g1) { return g1.toUpperCase(); });
		}
		
		// Default to returning the string back just as it was
		return style;
	}
	
	/**
	 * Sets the specified style with cross browser adjustments if necessary
	 * 
	 * @param {Object} element The element to alter
	 * @param {String} name The name of the style (can be camel case or hyphen separated)
	 * @param {String} value The value to set
	 * @private
	 */
	function setStyle(element, name, value) {
		name = camelStyle(name);
		
		element.style[name] = value;
		
		if(name === 'opacity') {
			element.style.filter = 'alpha(opacity=' + (parseFloat(value) * 100) + ')';
			element.style.zoom = '1';
			element.style.MozOpacity = value;
			element.style.KhtmlOpacity = value;
		}
	}
	
	// Check what kind of variable name is
	if(typeof name === 'string') {
		// Check if they passed a value
		if(typeof value === 'string') {
			// Loop through all elements and assign the style
			for(i = 0; i < this.length; i++) {
				setStyle(this[i], name, value);
			}
		}
		else {
			// Get the style
			return this[0].style[camelStyle(name)];
		}
	}
	else if(typeof name === 'object') {
		// Loop through all the styles
		for(n in name) {
			// Check that it is not a prototype
			if(name.hasOwnProperty(n)) {
				// Loop through all elements and assign the style
				for(i = 0; i < this.length; i++) {
					setStyle(this[i], n, name[n]);
				}
			}
		}
	}
	
	// Return the Spark object to allow chaining
	return this;
});
