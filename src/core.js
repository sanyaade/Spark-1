/**
 * @preserve Spark JavaScript Library v3.0.0
 * http://sparkjs.co.uk/
 * 
 * Copyright 2011, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://sparkjs.co.uk/licence.html
 */
(function() {
	// Create the object
	var Spark = {};
	
	// Add the extend function
	Spark.prototype.extend = function(toAdd) {
		
	};
	
	// Check if the name is already in use
	if(typeof window.Spark === 'undefined') {
		// If not then expose the object
		window.Spark = Spark;
	}
});