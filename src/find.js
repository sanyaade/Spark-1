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
		par = parameters,
		ctx = (typeof context !== 'undefined') ? context : document,
		i = null,
		e = null,
		tempFound = null,
		classes = null,
		built = this.clone();
	
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
	}
	
	// Return the object with all the elements within it
	return built;
});