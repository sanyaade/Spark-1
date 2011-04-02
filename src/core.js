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
		this.prototype[name] = toAdd;
	};
	
	// Expose the object
	window.Spark = new Spark();
}());
