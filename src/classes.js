/**
 * Adds or removes classes from elements
 */
Spark.extend('classes', function() {
	// Set up the functions
	var built = {
		add: function(name) {
			return this.that;
		},
		
		remove: function(name) {
			return this.that;
		},
		
		has: function(name) {
			
		}
	};
	
	// Put this in scope
	built.that = this;
	
	// Return the object
	return built;
}, true);
