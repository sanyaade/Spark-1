/**
 * Remove an event listener from the found elements.
 * 
 * @param {String} type Name of the event you want to remove
 * @param {Function} fn Reference to the function which you previously passed
 */
Spark.extend('removeEvent', function(type, fn) {
	// Initialise any required variables
	var found = null,
		that = this;
	
	// Loop through all of the elements
	this.each(function(e) {
		// Check we have events
		if(that.find(e).data('SparkEvents')) {
			// Loop through the events until we find one
			that.each(function(r) {
				if(r.fn === fn && r.type === type) {
					// Found it! Remove the event in the appropriate way
					if(e.removeEventListener) {
						e.removeEventListener(type, r.reference, false);
					}
					else {
						e.detachEvent(type, r.reference);
					}
				}
			}, that.find(e).data('SparkEvents'));
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
