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
		ctx = (typeof context !== 'undefined') ? context : document,
		i = null,
		e = null,
		tempFound = null,
		classes = null,
		built = this.clone();
	
	// Check if parameters is not an actual search object
	if(typeof parameters === 'object') {
		if(typeof parameters.nodeName === 'string') {
			// They passed an element, this needs to be adopted into the chain
			built[0] = parameters;
			built.elements = [parameters];
			built.length = 1;
			
			// Return the object with the adopted value
			return built;
		}
		else if(parameters instanceof Array) {
			// They passed an array, this needs to be adopted into the chain
			for(i = 0; i < parameters.length; i++) {
				built[i] = parameters[i];
			}
			
			built.length = parameters.length;
			
			// Return the object with the adopted values
			return built;
		}
	}
	
	/**
	 * Takes a string, breaks it down into its components and uses them to run the find function
	 * 
	 * @param {String} selector The selector string
	 * @param {Object} offset The instance of Spark already containing elements
	 * @returns {Object} An instance of Spark containing all of the found elements
	 */
	function parseSelector(selector, offset) {
		// Initialise any required variables
		var selectors = selector.split(/\s*,\s*/g),
			paths = null,
			built = Spark.clone(),
			i = null,
			p = null,
			path = null,
			found = [],
			parameters = null,
			tempFound = null;
		
		// Loop through the selectors
		for(i = 0; i < selectors.length; i++) {
			// Grab the paths
			paths = selectors[i].split(/\s+/g);
			
			// Reset the parameters
			parameters = [];
			
			// Loop through all the paths
			for(p = 0; p < paths.length; p++) {
				// Grab the path
				path = paths[p];
				
				// Add the new object
				parameters.push({});
				
				// Keep looping until the string is gone
				while(path.length > 0) {
					if(path.match(/^([a-z0-9*]+)/i)) {
						// Element
						if(typeof parameters[p].tag === 'undefined') {
							parameters[p].tag = path.replace(/^([a-z0-9*]+).*/i, "$1");
						}
						else {
							if(typeof parameters[p].tag === 'string') {
								parameters[p].tag = [parameters[p].tag];
							}
							
							parameters[p].tag.push(path.replace(/^([a-z0-9*]+).*/i, "$1"));
						}
						
						// Remove the selection
						path = path.replace(/^([a-z0-9*]+)/i, '');
					}
					else if(path.match(/^#([a-z][a-z0-9-_:]*)/i)) {
						// ID
						if(typeof parameters[p].id === 'undefined') {
							parameters[p].id = path.replace(/^#([a-z][a-z0-9-_:]*).*/i, "$1");
						}
						else {
							if(typeof parameters[p].id === 'string') {
								parameters[p].id = [parameters[p].id];
							}
							
							parameters[p].id.push(path.replace(/^#([a-z][a-z0-9-_:]*).*/i, "$1"));
						}
						
						// Remove the selection
						path = path.replace(/^#([a-z][a-z0-9-_:]*)/i, '');
					}
					else if(path.match(/^\.(-?[_a-z]+[_a-z0-9\-]*)/i)) {
						// Class
						if(typeof parameters[p].classes === 'undefined') {
							parameters[p].classes = path.replace(/^\.(-?[_a-z]+[_a-z0-9\-]*).*/i, "$1");
						}
						else {
							if(typeof parameters[p].classes === 'string') {
								parameters[p].classes = [parameters[p].classes];
							}
							
							parameters[p].classes.push(path.replace(/^\.(-?[_a-z]+[_a-z0-9\-]*).*/i, "$1"));
						}
						
						// Remove the selection
						path = path.replace(/^\.(-?[_a-z]+[_a-z0-9\-]*)/i, '');
					}
					else {
						// If it does not match anything return false to stop endless loops
						return false;
					}
				}
			}
			
			// So now we have an array of parameter objects
			// Set up temp found to search with
			tempFound = offset;
			
			// Loop through all of the parameter objects
			for(p = 0; p < parameters.length; p++) {
				// Now do the search into tempFound
				tempFound = tempFound.find(parameters[p]);
			}
			
			// When done concat these results to the found array
			found = found.concat(tempFound.elements);
		}
		
		// Loop through the found adding them to the object
		for(i = 0; i < found.length; i++) {
			built[i] = found[i];
		}
		
		// Add the array version
		built.elements = found;
		
		// Add the length
		built.length = found.length;
		
		// Return the built object
		return built;
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
					if(tag && compare === '*') {
						return true;
					}
					
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
		else if(typeof compare === 'object') {
			// It is an object of attributes, loop through and compare
			// If any do not match, return false
			for(i in compare) {
				// Make sure it has the property and so does the object
				if(compare.hasOwnProperty(i)) {
					// If it is true then all we have to do is see if it exists
					if(compare[i] === true) {
						// So now if it has the attribute then continue
						if(value.hasOwnProperty(i) === false) {
							// It doesnt
							return false;
						}
					}
					
					// So now we check if it has the value again, if it does we compare
					if(value.hasOwnProperty(i) === true) {
						// It does, check what it is
						if(typeof compare[i] === 'string') {
							if(value[i] !== compare[i]) {
								return false;
							}
						}
						else if(compare[i] instanceof Array) {
							// It is an or statement, so we need do a special check
							if(compare[i].join(' ').match(new RegExp('(^| )' + value[i] + '($| )', 'g'))) {
								return true;
							}
							else {
								return false;
							}
						}
					}
					else {
						// It doesnt
						return false;
					}
				}
			}
			
			// Default to returning true
			return true;
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
				tempFound = ctx.getElementsByTagName(tag[i]);
				
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
	
	// Check if this is part of the chain
	if(this.elements instanceof Array) {
		// Find from the previously found
		// Loop through the elements
		for(i = 0; i < this.length; i++) {
			tempFound = findElements(parameters.tag, this.elements[i]);
			
			// Loop through the elements
			for(e = 0; e < tempFound.length; e++) {
				// Push the found element to found
				found.push(tempFound[e]);
			}
		}
	}
	else {
		// Find from scratch
		found = findElements(parameters.tag, ctx);
	}
	
	// Check if parameters is a string
	if(typeof parameters === 'string') {
		// If so, then return what is found by the parse selector function
		return parseSelector(parameters, this);
	}
	
	// Loop through all elements
	for(i = 0; i < found.length; i++) {
		// Grab the current element
		e = found[i];
		
		// Get the classes of the element
		classes = e.className.split(/\s+/g);
		
		// Check if the element matches
		if(
			compareValue(e.nodeName, parameters.tag, true) === true &&
			compareValue(classes, parameters.classes) === true &&
			compareValue(e.id, parameters.id) === true &&
			compareValue(e, parameters.attribute) === true
			) {
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
	if(typeof parameters.find === 'object') {
		// Refind with the passed parameters
		built = built.find(parameters.find);
	}
	
	// Return the object with all the elements within it
	return built;
});
