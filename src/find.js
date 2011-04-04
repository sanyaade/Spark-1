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
		par = parameters,
		ctx = (typeof context !== 'undefined') ? context : document,
		i = null,
		e = null,
		tempFound = null,
		classes = null,
		built = this.clone();
	
	/**
	 * Compare the value of a tag or ID to an array or string of comparisons
	 * 
	 * @param {String} value Either an ID or a tag name to compare
	 * @param {String|Array} compare The string or array of values to check against
	 * @returns {Boolean} Returns true if it can not be compared or if they match
	 */
	function compareValue(value, compare) {
		// Initialise any required variables
		var i = null;
		
		// Check what type of search we need to do
		if(typeof compare === 'string') {
			// Compare the two strings
			if(value === compare) {
				return true;
			}
			else {
				return false;
			}
		}
		else if(compare instanceof Array) {
			// Loop through and compare
			for(i = 0; i < compare.length; i++) {
				if(value === compare[i]) {
					return true;
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
	
	// Check what the tag filter is
	if(typeof par.tag === 'string') {
		// Perform a basic tag search
		found = ctx.getElementsByTagName(par.tag);
	}
	else if(par.tag instanceof Array) {
		// Perform a looping tag search
		for(i = 0; i < par.tag.length; i++) {
			// Search into the temporary location
			tempFound = ctx.getElementsByTagName(par.tag[i]);
			
			// Loop through the elements
			for(e = 0; e < tempFound.length; e++) {
				// Push the found element to found
				found.push(tempFound[e]);
			}
		}
	}
	else {
		// Default to grabbing all tags
		found = ctx.getElementsByTagName('*');
	}
	
	// Loop through all elements
	for(i = 0; i < found.length; i++) {
		// Grab the current element
		e = found[i];
		
		// Get the classes of the element
		classes = e.className.split(/\s+/g).join(' ');
		
		// Check if the element matches
		if(compareValue(e.nodeName, par.tags) === true && compareClass(classes, par.classes) === true && compareValue(e.id, par.ids) === true) {
			// Add the found element to the filtered array
			filtered.push(e);
		}
	}
	
	// Loop through the filtered adding them to the object
	for(i = 0; i < filtered.length; i++) {
		built[i] = filtered[i];
	}
	
	// Return the object with all the elements within it
	return built;
});