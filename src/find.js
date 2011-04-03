/**
 * Find elements that match the specified parameters
 * 
 * @param {Object} parameters The criteria the element must meet to be selected
 * @returns {Object} Returns the Spark object to allow chaining
 */
Spark.extend('find', function(parameters) {
	// Initialise any required variables
	var name = null,
		value = null;
	
	// Loop through all the parameters
	for(name in parameters) {
		// Make sure it is not a prototype
		if(parameters.hasOwnProperty(name)) {
			// Grab the current parameter
			value = parameters[name];
		}
	}
});