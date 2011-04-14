/**
 * Remove an event listener from the found elements.
 * 
 * @param {String} type Name of the event you want to remove
 * @param {Function} fn Reference to the function which you previously passed
 */
Spark.extend('removeEvent', function(type, fn) {
	// Loop through all of the elements
	this.each(function(e) {
		if(e.removeEventListener) {
			e.removeEventListener(type, fn, false);
		}
		else {
			e.detachEvent(type, previousReference);
		}
	});
	
	// Return the Spark object for chaining
	return this;
});