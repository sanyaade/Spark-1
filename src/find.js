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
		ctx = (typeof context !== 'undefined') ? context : document;
	
	// Work out what we need to do
	if(typeof par.tag === 'string') {
		// Perform a basic tag search
		found.push(ctx.getElementsByTagName(par.tag));
	}
});