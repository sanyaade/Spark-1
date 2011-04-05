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
	
	/**
	 * Adds a variable to Spark's prototype
	 * 
	 * @param {String} name Name you wish to add your variable under
	 * @param toAdd Variable you wish to add
	 */
	Spark.prototype.extend = function(name, toAdd) {
		// Add the object
		Spark.prototype[name] = toAdd;
	};
	
	/**
	 * Create a clone of the object. This should be done when anything is being stored in it for chaining.
	 * Otherwise added variables will be there for ever.
	 * This way they only exist within that chain
	 * 
	 * @returns {Object} The copy of the object
	 */
	Spark.prototype.clone = function() {
		return new Spark();
	};
	
	// Expose the object
	window.Spark = new Spark();
	
	// Set up the alias for the find function
	window.$ = function(parameters, context) {
		return window.Spark.find(parameters, context);
	};
}());
