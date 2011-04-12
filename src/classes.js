/**
 * Adds or removes classes from elements
 */
Spark.extend('classes', function() {
	// Set up the functions
	var built = {
		add: function() {
			return this.that;
		},
		
		remove: function() {
			return this.that;
		}
	};
	
	// Put this in scope
	built.that = this;
	
	// Return the object
	return built;
}, true);
