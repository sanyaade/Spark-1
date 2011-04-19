/**
 * Replace or append text to the specified elements
 */
Spark.extend('text', function(content, append) {
	// Initialise any required variables
	var type = (document.body.innerText) ? 'innerText' : 'textContent';
	
	// Check if they just want the text
	if(typeof content === 'undefined') {
		return this[0][type];
	}
	
	// Loop through all the elements
	this.each(function(e) {
		// Append or replace the text
		if(append) {
			e[type] += content;
		}
		else {
			e[type] = content;
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
