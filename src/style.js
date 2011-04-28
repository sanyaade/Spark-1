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
		n = null,
		that = this;
	
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
	 * Turns a camelcase seperated style name into a hyphen one
	 * 
	 * @param {String} style The style name to convert
	 * @returns {String} The hyphen version of the string
	 * @private
	 */
	function hyphenStyle(style) {
		// Return the hyphen seperated string
		return style.replace(/([A-Z])/g, function($1) {
			return '-' + $1.toLowerCase();
		});
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
		// Initialise any required variables
		var pxNames = 'zIndex fontWeight opacity zoom lineHeight',
			nameTest = null;
		
		// Assign the new regex and fix the name
		name = camelStyle(name);
		nameTest = new RegExp('(^|\\s)' + name + '($|\\s)', 'i');
		
		// Assign px to the value if required
		value = (typeof value === 'number' && !nameTest.test(pxNames)) ? value + 'px' : value;
		
		element.style[name] = value;
		
		if(name === 'opacity') {
			element.style.zoom = '1';
			element.style.filter = 'alpha(opacity=' + Math.floor(parseFloat(value) * 100) + ')';
			element.style.MozOpacity = value;
			element.style.KhtmlOpacity = value;
		}
	}
	
	/**
	 * Retrieves the specified computed style from the element
	 * 
	 * @param {Object} e Element object to get styles from
	 * @param {String} name The name of the computed style you require
	 * @returns {String} The computed style of the first element in the element list
	 */
	function getStyle(e, name) {
		// Initialise any required variables
		var style = null;
		
		// If we can use getComputedStyle
		if(typeof getComputedStyle !== 'undefined') {
			// Return getComputedStyle
			style = document.defaultView.getComputedStyle(e, null).getPropertyValue(hyphenStyle(name));
		}
		else {
			// Otherwise return currentStyle
			style = e.currentStyle[name];
		}
		
		// If not found, check the style property
		if(!style) {
			style = e.style[name];
		}
		
		// Fix colours
		if(name.toLowerCase().indexOf('color') !== -1) {
			style = that.color.toRgb(style);
		}
		
		// Return the found style, if not found then look in the style property
		return style;
	}
	
	// Check what kind of variable name is
	if(typeof name === 'string') {
		// Check if they passed a value
		if(typeof value === 'string' || typeof value === 'number') {
			// Loop through all elements and assign the style
			for(i = 0; i < this.length; i++) {
				setStyle(this[i], name, value);
			}
		}
		else {
			// Get the style
			return getStyle(this[0], camelStyle(name));
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
