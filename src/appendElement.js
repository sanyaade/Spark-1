/**
 * Inserts a new element after the specified elements
 * 
 * You can pass an already created element from the createElement function or pass the parameters for a new one. Like so.
 * 
 *     $('p').appendElement('p', 'Hello, World!', {
 *         class: 'someClass',
 *         title: 'Some title'
 *     }, {
 *         'background-color': '#FF0000'
 *     });
 * 
 * Passing false for the html, attributes or styles will cause them to be ignored.
 * 
 * @param {String|Object} name Name of the node you wish to create or an already created element
 * @param {String|Boolean} html The inner html of the element
 * @param {Object|Boolean} attributes Attributes to assign to the element
 * @param {Object|Boolean} styles Styles to assign to the element
 * @returns {Object} The Spark object for chaining
 */
Spark.extend('appendElement', function(name, html, attributes, styles) {
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
		e.parentNode.insertBefore(el.cloneNode(true), e.nextSibling);
	});
	
	// Return the Spark object for chaining
	return this;
});
