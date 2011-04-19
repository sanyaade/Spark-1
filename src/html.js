/**
 * Replace or append a html string to the specified elements
 */
Spark.extend('html', function(content, append) {
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
