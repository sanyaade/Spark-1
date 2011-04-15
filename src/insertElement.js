/**
 * Inserts a new element into the specified elements
 * 
 * @param {String|Object} name Name of the node you wish to create
 * @param {String|Boolean} html The inner html of the element
 * @param {Object|Boolean} attributes Attributes to assign to the element
 * @param {Object|Boolean} styles Styles to assign to the element
 * @returns {Object} The Spark object for chaining
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
