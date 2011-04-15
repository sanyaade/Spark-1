/**
 * Removes the found elements
 * 
 * To remove all p tags on the page, you would use the following line
 * 
 *     $('p').removeElement();
 * 
 * @returns {Object} The Spark object for chaining
 */
Spark.extend('removeElement', function() {
	// Loop through the elements
	this.each(function(e) {
		e.parentNode.removeChild(e);
	});
	
	// Return the Spark object for chaining
	return this;
});
