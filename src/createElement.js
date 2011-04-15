/**
 * Creates an element from the passed parameters
 * 
 * To create a basic element such as a p tag, all you need to provide is a tag name.
 * 
 *     Spark.createElement('p');
 * 
 * And the new p tag object will be returned.
 * 
 * If you wanted to assign a class and title to this element, you pass the attribute assigning object as the second argument.
 * 
 *     Spark.createElement('p', {
 *         class: 'someClass',
 *         title: 'Some title'
 *     });
 * 
 * You can also style the element with the third argument.
 * 
 *     Spark.createElement('p', {
 *         class: 'someClass',
 *         title: 'Some title'
 *     }, {
 *         'background-color': '#FF0000'
 *     });
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
