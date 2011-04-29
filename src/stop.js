/**
 * Stops all animations for the specified elements
 */
Spark.extend('stop', function() {
	// Initialise any required variables
	var i = null,
		timeouts = null,
		that = this;
	
	// Loop through all of the elements
	this.each(function(e) {
		// Grab the timesouts
		timeouts = that.find(e).data('SparkTimeouts');
		
		// Loop through all of the timeouts
		for(i = 0; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		
		// Reset the array
		that.find(e).data('SparkTimeouts', []);
	});
});