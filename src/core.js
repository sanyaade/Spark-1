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
		// Add the object
		this.prototype[name] = toAdd;
	};
	
	// Expose the object
	window.Spark = new Spark();
}());
