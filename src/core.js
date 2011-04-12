/**
 * @preserve Spark JavaScript Library v3.0.0
 * http://sparkjs.co.uk/
 * 
 * Copyright 2011, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://sparkjs.co.uk/licence.html
 * 
 * @private
 */
(function() {
	// Create the object
	function Spark(){}
	
    /**
     * Adds a variable to Spark's prototype.
     * This is used to extend Spark with plugins.
     * 
     * @param {String} name Name you wish to add your variable under
     * @param {Mixed} toAdd Variable you wish to add
     * @param {Boolean} apply For when your extension has multiple functions but you want to return the Spark object
     */
	Spark.prototype.extend = function(name, toAdd, apply) {
		if(apply) {
			// Add the called object
			Spark.prototype[name] = toAdd.apply(this);
		}
		else {
			// Add the object
			Spark.prototype[name] = toAdd;
		}
	};
	
    /**
     * Create a clone of the object. This should be done when anything is being stored in it for chaining.
     * Otherwise added variables will be there for ever.
     * This way they only exist within that chain.
     * 
     * @returns {Object} The copy of the object
     */
	Spark.prototype.clone = function() {
		return new Spark();
	};
	
	/** @private */
	// Expose the object
	window.Spark = new Spark();
	
	// Set up the alias for the find function
	window.$ = function(parameters, context) {
		return window.Spark.find(parameters, context);
	};
}());
