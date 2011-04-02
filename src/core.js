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
	function Spark(){}
	
	// Add the extend function
	Spark.prototype.extend = function(name, toAdd) {
		// Check if it is an object
		if(typeof toAdd === 'object') {
			// If so, we need to add the extend function to it
			toAdd.prototype.extend = this.extend;
		}
		
		// Add the object or function to this object
		this[name] = toAdd;
	};
	
	// Make sure the name is not in use
	if(window.hasOwnProperty('Spark') === false) {
		// Expose the object
		window.Spark = new Spark();
	}
}());