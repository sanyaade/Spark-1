/**
 * Replace or append a html string to the specified elements
 * 
 * To replace the content of an element you just have to pass a replacement string, like so.
 * 
 *     $('p.someClass').html('Replaced');
 * 
 * If you pass true as the second argument then it will append the text.
 * 
 * If nothing is passed then it returns the first elements content.
 */
Spark.extend('html', function(content, append) {
	// Check if they just want the innerHTML
	if(typeof content === 'undefined') {
		return this[0].innerHTML;
	}
	
	// Loop through all the elements
	this.each(function(e) {
		// Append or replace the html
		if(append) {
			e.innerHTML += content;
		}
		else {
			e.innerHTML = content;
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
