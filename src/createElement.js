/**
 * Creates an element from the passed parameters
 * 
 * @param {String} name Name of the node you wish to create
 * @param {Object} attributes Attributes to assign to the element
 * @param {Object} styles Styles to assign to the element
 * @returns {Object} The created element
 */
Spark.extend('createElement', function(name, attributes, styles) {
	// Create the new element
	var built = document.createElement(name);
	
	// Assign the attributes if required
	if(attributes) {
		this.find(built).attribute(attributes);
	}
	
	// Assign the styles if required
	if(styles) {
		this.find(built).style(styles);
	}
	
	// Return the built element
	return built;
});
