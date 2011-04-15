/**
 * Inserts a new element into the specified elements
 */
Spark.extend('insertElement', function(name, html, attributes, styles) {
	// Initialise any required variables
	var el = null;
	
	// Check if we need to create the new element
	if(typeof name === 'string') {
		el = this.createElement(name, html, attributes, styles);
	}
	else {
		el = name;
	}
	
	// Loop through the elements
	this.each(function(e) {
		e.appendChild(el.cloneNode(true));
	});
	
	// Return the Spark object for chaining
	return this;
});
