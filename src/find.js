/**
 * Find elements that match the specified parameters
 * 
 * @param {Object} parameters The criteria the element must meet to be selected
 * @param {Element} context The place you wish to start the search from, defaults to document
 * @returns {Object} Returns the Spark object to allow chaining
 */
Spark.extend('find', function(parameters, context) {
	// Initialise any required variables
	var found = [],
		filtered = [],
		par = null,
		ctx = (typeof context !== 'undefined') ? context : document,
		i = null,
		e = null,
		tempFound = null,
		classes = null,
		built = this.clone();
	
	/**
	 * Turns a selector string into an object that the find function can understand
	 * 
	 * @param {String} selector The selector string
	 * @returns {Object} The object version of the selector string
	 */
	function parseSelector(selector) {
		
	}
	
	/**
	 * Compare the value of a tag or ID to an array or string of comparisons
	 * 
	 * @param {String|Array} value Either an ID, an array of classes or a tag name to compare
	 * @param {String|Array} compare The string or array of values to check against
	 * @returns {Boolean} Returns true if it can not be compared or if they match
	 */
	function compareValue(value, compare, tag) {
		// Initialise any required variables
		var i = null,
			classes = ((value instanceof Array) ? value.join(' ') : false);
		
		// Check what type of search we need to do
		if(typeof compare === 'string') {
			// Compare the two strings
			if(classes) {
				if(classes.match(new RegExp('(^| )' + compare + '($| )', 'g'))) {
					return true;
				}
				else {
					return false;
				}
			}
			else {
				if(value === ((tag) ? compare.toUpperCase() : compare)) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		else if(compare instanceof Array) {
			// Loop through and compare
			for(i = 0; i < compare.length; i++) {
				if(classes) {
					if(classes.match(new RegExp('(^| )' + compare[i] + '($| )', 'g'))) {
						return true;
					}
				}
				else {
					if(value === ((tag) ? compare[i].toUpperCase() : compare[i])) {
						return true;
					}
				}
			}
			
			// Default to returning false
			return false;
		}
		else {
			// Default to returning true
			return true;
		}
	}
	
	/**
	 * Find elements from a context
	 * 
	 * @param {String} tag The name of the tag you wish to find
	 * @param {Object} ctx The context you wish to search in
	 * @returns {Array} Returns an array of the found elements
	 */
	function findElements(tag, ctx) {
		// Initialise any required variables
		var tempFound = null,
			found = [];
		
		// Check what the tag filter is
		if(typeof tag === 'string') {
			// Perform a basic tag search
			return ctx.getElementsByTagName(tag);
		}
		else if(tag instanceof Array) {
			// Perform a looping tag search
			for(i = 0; i < tag.length; i++) {
				// Search into the temporary location
				tempFound = ctx.getElementsByTagName(par.tag[i]);
				
				// Loop through the elements
				for(e = 0; e < tempFound.length; e++) {
					// Push the found element to found
					found.push(tempFound[e]);
				}
			}
			
			// Return the found ones
			return found;
		}
		else {
			// Default to grabbing all tags
			return ctx.getElementsByTagName('*');
		}
	}
	
	par = (typeof parameters === 'string') ? parseSelector(parameters) : parameters;
	
	// Check if this is part of the chain
	if(this.elements instanceof Array) {
		// Find from the previously found
		// Loop through the elements
		for(i = 0; i < this.length; i++) {
			tempFound = findElements(par.tag, this.elements[i]);
			
			// Loop through the elements
			for(e = 0; e < tempFound.length; e++) {
				// Push the found element to found
				found.push(tempFound[e]);
			}
		}
	}
	else {
		// Find from scratch
		found = findElements(par.tag, ctx);
	}
	
	// Loop through all elements
	for(i = 0; i < found.length; i++) {
		// Grab the current element
		e = found[i];
		
		// Get the classes of the element
		classes = e.className.split(/\s+/g);
		
		// Check if the element matches
		if(compareValue(e.nodeName, par.tag, true) === true && compareValue(classes, par.classes) === true && compareValue(e.id, par.id) === true) {
			// Add the found element to the filtered array
			filtered.push(e);
		}
	}
	
	// Loop through the filtered adding them to the object
	for(i = 0; i < filtered.length; i++) {
		built[i] = filtered[i];
	}
	
	// Add the array version
	built.elements = filtered;
	
	// Add the length
	built.length = filtered.length;
	
	// Check if there is a find parameter
	if(typeof par.find === 'object') {
		// Refind with the passed parameters
		built = built.find(par.find);
	}
	
	// Return the object with all the elements within it
	return built;
});
