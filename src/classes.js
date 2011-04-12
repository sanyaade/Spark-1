/**
 * Adds or removes classes from elements
 */
Spark.extend('classes', function() {
	// Initialise the object
	var built = {
		add: function(name) {
			// Return the Spark object for chaining
			return this.that;
		},
		
		remove: function(name) {
			// Return the Spark object for chaining
			return this.that;
		}
	};
	
	// Add the reference to the Spark object
	built.that = this;
	
	// Return the object
	return built;
});
