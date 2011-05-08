/**
 * Replace or append text to the specified elements
 * 
 * To replace the content of an element you just have to pass a replacement string, like so.
 * 
 *     $('p.someClass').text('Replaced');
 * 
 * If you pass true as the second argument then it will append the text.
 * 
 * If nothing is passed then it returns the first elements content.
 */
Spark.extend('text', function(content, append) {
	// Initialise any required variables
	var type = (document.body.innerText) ? 'innerText' : 'textContent';
	
	// Check if they just want the text
	if(typeof content === 'undefined') {
		// Make sure we have some elements
		if(this.length !== 0) {
			return this[0][type];
		}
		else {
			// Return false because we have no elements
			return false;
		}
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
