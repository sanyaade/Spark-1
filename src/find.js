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
		i = null;
	
	// Check what the tag filter is
	if(typeof par.tag === 'string') {
		// Perform a basic tag search
		found = ctx.getElementsByTagName(par.tag);
	}
	else if(par.tag instanceof Array) {
		// Perform a looping tag search
		for(i = 0; i < par.tag.length; i++) {
			found.concat(ctx.getElementsByTagName(par.tag[i]));
		}
	}
});