/**
 * Animate styles of the specified elements
 * 
 * @param {String|Object} style Name of the style you wish to animate
 * @param {String|Number} target Only required if style is a string, the target to animate to. If it is a number it will append px as the unit
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('animate', function(style, target) {
	// Initialise any required variables
	var that = this,
		from = null,
		unit = null;
	
	// Check if we need to perform multiple animations
	if(typeof style === 'object') {
		// Loop over the animations calling them
		this.each(function(t, s) {
			that.animate(s, t);
		}, style);
	}
	else {
		// Loop through all the elements
		this.each(function(e) {
			// Grab where we need to animate from
			from = that.find(e).style(style);
			
			// Get the unit if the target is a string
			if(typeof target === 'string') {
				unit = target.replace(/[^%|in|cm|mm|em|ex|pt|pc|px]/gi, '');
			}
			else {
				// Otherwise set it to an empty string
				unit = '';
			}
		});
	}
	
	// Return the Spark object
	return this;
});
