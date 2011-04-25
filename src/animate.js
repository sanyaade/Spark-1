/**
 * Animate styles of the specified elements
 */
Spark.extend('animate', function(style, target) {
	// Initialise any required variables
	var that = this;
	
	// Check if we need to perform multiple animations
	if(typeof style === 'object') {
		// Loop over the animations calling them
		this.each(function(t, s) {
			that.animate(s, t);
		}, style);
	}
	else {
		
	}
	
	// Return the Spark object
	return this;
});
