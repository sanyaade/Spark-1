/**
 * The find function is Spark's selector engine. It supports all of the [CSS2 selectors](http://www.w3.org/TR/CSS2/selector.html) apart from the link and dynamic pseudo selectors.
 * Say you wanted to find all p tags that where within a div, you would use the following line.
 * 
 *     Spark.find('div p');
 * 
 * You can also used the dollar alias for the find function like so.
 * 
 *     $('div p');
 * 
 * This saves a few characters and helps you distinguish lines that involve elements from ones that do not.
 * 
 * You can also pass a context to search within, for example.
 * 
 *     var el = $('div#contactForm');
 *     $('div p', el);
 * 
 * The elements are placed within the Spark object. The object is then assigned a length so you can treat it as an array. There is also an array of elements located in the `elements` section of the object.
 * 
 * @param {String|Object} parameters The criteria the element must meet to be selected
 * @param {Object} context The place you wish to start the search from, defaults to document
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
	}
	
	/**
	 * Removes duplicate values from an array
	 * 
	 * @param {Array} target The target array to have duplicates remove from
	 * @returns {Array} The cleaned array with no duplicate values
	 * @private
	 */
	function unique(target) {
		var a = [],
			l = target.length,
			j = null,
			i = null;
		
		for(i = 0; i < l; i++) {
			for(j = i + 1; j < l; j++) {
				if(target[i] === target[j]) {
					j = ++i;
				}
			}
			
			a.push(target[i]);
		}
		return a;
	}
	
	/**
	 * Splits CSS selectors with quotes in mind
	 * 
	 * @param {String} selector The CSS selector string (without commas, just spaces)
	 * @returns {Array} The array of selectors
	 * @private
	 */
	function splitSelector(selector) {
		// Initialise any required variables
		var i = null,
			split = [],
			points = [],
			inString = false;
		
		// Loop through all of the characters
		for(i = 0; i < selector.length; i++) {
			// If we find a quote then toggle inString
			if(selector.indexOf('\'', i) === i || selector.indexOf('"', i) === i) {
				if(inString === true) {
					inString = false;
				}
				else if(inString === false) {
					inString = true;
				}
			}
			else if(selector.indexOf(' ', i) === i && inString === true) {
				// So we are in a string, we have a space, log its location
				points.push(i);
			}
		}
		
		// Loop through all the points replacing the spaces
		for(i = 0; i < points.length; i++) {
			selector = selector.substr(0, points[i] + i) + '\\s' + selector.substr(points[i] + 1 + i);
		}
		
		// Split the string
		split = selector.split(/\s+/g);
		
		// Loop through the split unescaping the string
		for(i = 0; i < split.length; i++) {
			split[i] = split[i].replace(/\\s/g, ' ');
		}
		
		// Return the split selector
		return split;
	}
	
	/**
	 * Turns a node list into an array
	 * 
	 * @param {NodeList} list The node list you wish to be converted
	 * @returns {Array} The array version of the NodeList
	 * @private
	 */
	function toArray(list) {
		// Initialise any required variables
		var i = null,
			built = [];
		
		// Loop through the passed nodes adding them to the array
		for(i = 0; i < list.length; i++) {
			built.push(list[i]);
		}
		
		// Return the found elements
		return built;
	}
	
	/**
	 * Takes a string, breaks it down into its components and uses them to run the find function
	 * 
	 * @param {String} selector The selector string
	 * @param {Object} offset The instance of Spark already containing elements
	 * @returns {Object} An instance of Spark containing all of the found elements
	 * @private
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
			tempFound = null,
			regexs = [
				'^\\[([a-z_][\\-a-z0-9_]+)=[\'"](.*)[\'"]\\]', // Attribute comparison
				'^\\[([a-z_][\\-a-z0-9_]+)\\]', // Has attribute
				'^([a-z0-9*]+)', // Tag name comparison
				'^#([a-z][a-z0-9-_]*)', // ID comparison
				'^\\.(-?[_a-z]+[_a-z0-9\\-]*)', // Class comparison
				'^\\[([a-z_][\\-a-z0-9_]+)~=[\'"](.*)[\'"]\\]', // Whitespace seperated attribute
				'^\\[([a-z_][\\-a-z0-9_]+)\\|=[\'"](.*)[\'"]\\]', // Beginning of attribute with optional hyphen after
				'^:first-child', // Element must be the first child of it's parent
				'^:lang\\((.*)\\)' // Element is decendent of an element with the specified lang
			],
			finders = [];
		
		// Set up all the RegExps
		for(i = 0; i < regexs.length; i++) {
			finders.push({
				search: new RegExp(regexs[i], 'i'),
				remove: new RegExp(regexs[i] + '.*', 'i')
			});
		}
		
		// Loop through the selectors
		for(i = 0; i < selectors.length; i++) {
			// Grab the paths
			paths = splitSelector(selectors[i].replace(/(>|\+)/g, " $1 ").replace(/\s+(>|\+)\s+/g, " $1"));
			
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
					// Check if it is a direct child selector or direct sibling
					if(path.indexOf('>') === 0) {
						parameters[p].child = true;
						path = path.substr(1);
					}
					else if(path.indexOf('+') === 0) {
						parameters[p].sibling = true;
						path = path.substr(1);
					}
					
					// Do the checks
					if(path.match(finders[5].search)) {
						// Check if element has whitespace seperated attribute
						// Make sure the object exists
						if(typeof parameters[p].whiteSpaceAttribute === 'undefined') {
							parameters[p].whiteSpaceAttribute = {};
						}
						
						// Add the check
						parameters[p].whiteSpaceAttribute[path.replace(finders[5].remove, "$1")] = path.replace(finders[5].remove, "$2");
						
						// Remove the selection
						path = path.replace(finders[5].search, '');
					}
					else if(path.match(finders[6].search)) {
						// Check if element attribute begins with a string, potentially followed by a hyphen
						// Make sure the object exists
						if(typeof parameters[p].hyphenAttribute === 'undefined') {
							parameters[p].hyphenAttribute = {};
						}
						
						// Add the check
						parameters[p].hyphenAttribute[path.replace(finders[6].remove, "$1")] = path.replace(finders[6].remove, "$2");
						
						// Remove the selection
						path = path.replace(finders[6].search, '');
					}
					else if(path.match(finders[0].search)) {
						// Check if element has attribute
						// Make sure the object exists
						if(typeof parameters[p].attribute === 'undefined') {
							parameters[p].attribute = {};
						}
						
						// Add the check
						parameters[p].attribute[path.replace(finders[0].remove, "$1")] = path.replace(finders[0].remove, "$2");
						
						// Remove the selection
						path = path.replace(finders[0].search, '');
					}
					else if(path.match(finders[1].search)) {
						// Check if element has attribute
						// Make sure the object exists
						if(typeof parameters[p].attribute === 'undefined') {
							parameters[p].attribute = {};
						}
						
						// Add the check
						parameters[p].attribute[path.replace(finders[1].remove, "$1")] = true;
						
						// Remove the selection
						path = path.replace(finders[1].search, '');
					}
					else if(path.match(finders[2].search)) {
						// Element
						if(typeof parameters[p].tag === 'undefined') {
							parameters[p].tag = path.replace(finders[2].remove, "$1");
						}
						else {
							if(typeof parameters[p].tag === 'string') {
								parameters[p].tag = [parameters[p].tag];
							}
							
							parameters[p].tag.push(path.replace(finders[2].remove, "$1"));
						}
						
						// Remove the selection
						path = path.replace(finders[2].search, '');
					}
					else if(path.match(finders[3].search)) {
						// ID
						if(typeof parameters[p].id === 'undefined') {
							parameters[p].id = path.replace(finders[3].remove, "$1");
						}
						else {
							if(typeof parameters[p].id === 'string') {
								parameters[p].id = [parameters[p].id];
							}
							
							parameters[p].id.push(path.replace(finders[3].remove, "$1"));
						}
						
						// Remove the selection
						path = path.replace(finders[3].search, '');
					}
					else if(path.match(finders[4].search)) {
						// Class
						if(typeof parameters[p].classes === 'undefined') {
							parameters[p].classes = path.replace(finders[4].remove, "$1");
						}
						else {
							if(typeof parameters[p].classes === 'string') {
								parameters[p].classes = [parameters[p].classes];
							}
							
							parameters[p].classes.push(path.replace(finders[4].remove, "$1"));
						}
						
						// Remove the selection
						path = path.replace(finders[4].search, '');
					}
					else if(path.match(finders[7].search)) {
						// First child
						parameters[p].first = true;
						
						// Remove the selection
						path = path.replace(finders[7].search, '');
					}
					else if(path.match(finders[8].search)) {
						// First child
						parameters[p].lang = path.replace(finders[8].remove, "$1");
						
						// Remove the selection
						path = path.replace(finders[8].search, '');
					}
					else {
						// If it does not match anything return false to stop endless loops
						return false;
					}
				}
			}
			
			if(typeof document.querySelectorAll === 'undefined') {
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
		}
		
		// Check if we can perform a querySelector all search
		if(typeof document.querySelectorAll !== 'undefined') {
			if(typeof offset.elements === 'undefined') {
				found = toArray(document.querySelectorAll(selector));
			}
			else {
				for(i = 0; i < offset.length; i++) {
					found = toArray(offset[i].querySelectorAll(selector));
				}
			}
		}
		
		// Clean the array
		found = unique(found);
		
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
	 * @param {Boolean} tag If true, the values are converted to uppercase on comparison
	 * @param {Boolean} space If true, the values are whitespace seperated before comparison
	 * @param {Boolean} hyphen If true, the value must exactly match or start with followed by a hyphen
	 * @returns {Boolean} Returns true if it can not be compared or if they match
	 * @private
	 */
	function compareValue(value, compare, tag, space, hyphen) {
		// Initialise any required variables
		var i = null,
			e = null,
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
				if(((tag) ? value.toUpperCase() : value) === ((tag) ? compare.toUpperCase() : compare)) {
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
					if(((tag) ? value.toUpperCase() : value) === ((tag) ? compare[i].toUpperCase() : compare[i])) {
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
						if(value.getAttribute(i) === null) {
							// It doesnt
							return false;
						}
					}
					else {
						// So now we check if it has the value again, if it does we compare
						if(value.getAttribute(i) !== null) {
							// It does, check what it is
							if(typeof compare[i] === 'string') {
								if(hyphen) {
									if(value.getAttribute(i) !== compare[i] && value.getAttribute(i).indexOf(compare[i] + '-') !== 0) {
										return false;
									}
								}
								else if(space) {
									if(value.getAttribute(i) !== compare[i] && value.getAttribute(i).indexOf(compare[i] + ' ') !== 0) {
										return false;
									}
								}
								else {
									if(value.getAttribute(i) !== compare[i]) {
										return false;
									}
								}
							}
							else if(compare[i] instanceof Array) {
								// It is an or statement, so we need do a special check
								for(e = 0; e < compare[i].length; e++) {
									if(hyphen) {
										if(value.getAttribute(i) !== compare[i][e] && value.getAttribute(i).indexOf(compare[i][e] + '-') !== 0) {
											return false;
										}
									}
									else if(space) {
										if(value.getAttribute(i) !== compare[i][e] && value.getAttribute(i).indexOf(compare[i][e] + ' ') !== 0) {
											return false;
										}
									}
									else {
										if(value.getAttribute(i) !== compare[i][e]) {
											return false;
										}
									}
								}
							}
						}
						else {
							// It doesnt
							return false;
						}
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
	 * Check if the element has inherited the specified lang attribute
	 * 
	 * @param {Array} elements A list of elements to check the lang attributes of
	 * @param {String} lang The lang you wish to check for
	 * @returns {Array} The array of elements that inherit the specified lang
	 * @private
	 */
	function checkLang(elements, lang) {
		// Initialise any required variables
		var e = null,
			found = [],
			i = null;
		
		// Loop through all the elements
		for(i = 0; i < elements.length; i++) {
			// Grab the current element
			e = elements[i];
			
			// Keep looping up the dom til we can loop no more
			while(e.parentNode) {
				if(e.getAttribute('lang') === lang) {
					found.push(elements[i]);
					break;
				}
				
				e = e.parentNode;
			}
		}
		
		// Return the found elements
		return found;
	}
	
	/**
	 * Find elements from a context
	 * 
	 * @param {String} tag The name of the tag you wish to find
	 * @param {Object} ctx The context you wish to search in
	 * @param {Boolean} child Only find direct children
	 * @param {Boolean} sibling Only find the next sibling element
	 * @param {Boolean} first Only find elements that are the first child
	 * @param {String} lang Only find elements that are under the specified lang
	 * @returns {Array} Returns an array of the found elements
	 * @private
	 */
	function findElements(tag, ctx, child, sibling, first, lang) {
		// Initialise any required variables
		var tempFound = null,
			found = [];
		
		// Check what the tag filter is
		if(typeof tag === 'string') {
			// Perform a basic tag search
			tempFound = (sibling === true) ? ctx.parentNode.getElementsByTagName(tag) : ctx.getElementsByTagName(tag);
			
			// Loop through the elements
			for(e = 0; e < tempFound.length; e++) {
				// Push the found element to found
				// Check if it needs to be the first child
				if(first === true && tempFound[e] === (tempFound[e].parentNode.firstElementChild || tempFound[e].parentNode.firstChild)) {
					// And check if it is a direct child if we need to
					if(child === true && tempFound[e].parentNode === ctx) {
						found.push(tempFound[e]);
					}
					else if(sibling === true && (tempFound[e] === ctx.nextElementSibling || tempFound[e] === ctx.nextSibling)) {
						found.push(tempFound[e]);
					}
					else if(!child && !sibling) {
						found.push(tempFound[e]);
					}
				}
				else if(!first) {
					// And check if it is a direct child if we need to
					if(child === true && tempFound[e].parentNode === ctx) {
						found.push(tempFound[e]);
					}
					else if(sibling === true && (tempFound[e] === ctx.nextElementSibling || tempFound[e] === ctx.nextSibling)) {
						found.push(tempFound[e]);
					}
					else if(!child && !sibling) {
						found.push(tempFound[e]);
					}
				}
			}
			
			if(lang) {
				// Return the filtered array
				return checkLang(found, lang);
			}
			else {
				// Return the filtered array
				return found;
			}
		}
		else if(tag instanceof Array) {
			// Perform a looping tag search
			for(i = 0; i < tag.length; i++) {
				// Search into the temporary location
				tempFound = (sibling === true) ? ctx.parentNode.getElementsByTagName(tag[i]) : ctx.getElementsByTagName(tag[i]);
				
				// Loop through the elements
				for(e = 0; e < tempFound.length; e++) {
					// Push the found element to found
					// And check if it is a direct child if we need to
					if(child === true && tempFound[e].parentNode === ctx) {
						found.push(tempFound[e]);
					}
					else if(sibling === true && (tempFound[e] === ctx.nextElementSibling || tempFound[e] === ctx.nextSibling)) {
						found.push(tempFound[e]);
					}
					else if(!child && !sibling) {
						found.push(tempFound[e]);
					}
				}
			}
			
			if(lang) {
				// Return the filtered array
				return checkLang(found, lang);
			}
			else {
				// Return the filtered array
				return found;
			}
		}
		else {
			// Default to grabbing all tags
			tempFound = (sibling === true) ? ctx.parentNode.getElementsByTagName('*') : ctx.getElementsByTagName('*');
			
			// Loop through the elements
			for(e = 0; e < tempFound.length; e++) {
				// Push the found element to found
				// And check if it is a direct child if we need to
				if(child === true && tempFound[e].parentNode === ctx) {
					found.push(tempFound[e]);
				}
				else if(sibling === true && (tempFound[e] === ctx.nextElementSibling || tempFound[e] === ctx.nextSibling)) {
					found.push(tempFound[e]);
				}
				else if(!child && !sibling) {
					found.push(tempFound[e]);
				}
			}
			
			if(lang) {
				// Return the filtered array
				return checkLang(found, lang);
			}
			else {
				// Return the filtered array
				return found;
			}
		}
	}
	
	// Check if this is part of the chain
	if(this.elements instanceof Array) {
		// Find from the previously found
		// Loop through the elements
		for(i = 0; i < this.length; i++) {
			tempFound = findElements(parameters.tag, this.elements[i], parameters.child, parameters.sibling, parameters.first, parameters.lang);
			
			// Loop through the elements
			for(e = 0; e < tempFound.length; e++) {
				// Push the found element to found
				found.push(tempFound[e]);
			}
		}
	}
	else {
		// Find from scratch
		found = findElements(parameters.tag, ctx, parameters.child, parameters.sibling, parameters.first, parameters.lang);
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
			compareValue(e.nodeName, parameters.tag, true) &&
			compareValue(classes, parameters.classes) &&
			compareValue(e.id, parameters.id) &&
			compareValue(e, parameters.attribute) &&
			compareValue(e, parameters.whiteSpaceAttribute, false, true) &&
			compareValue(e, parameters.hyphenAttribute, false, false, true)
			) {
			// Add the found element to the filtered array
			filtered.push(e);
		}
	}
	
	// Clean the array
	filtered = unique(filtered);
	
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
