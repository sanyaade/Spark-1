/**
 * Animate styles of the specified elements
 * 
 * @param {String|Object} style Name of the style you wish to animate
 * @param {String|Number} target Only required if style is a string, the target to animate to. If it is a number it will append px as the unit
 * @returns {Object} Returns the Spark object for chaining
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
