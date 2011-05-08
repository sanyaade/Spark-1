/**
 * The find function is Spark's selector engine. It supports all of the [CSS3 selectors](http://www.w3.org/TR/css3-selectors/#selectors).
 * Say you wanted to find all p tags that where within a div, you would use the following line.
 * 
 *     Spark.find('div p');
 * 
 * You can also used the dollar alias for the find function like so.
 * 
 *     $('div p');
 * 
 * This saves a few characters and helps you distinguish lines that involve elements from ones that do not.
 * 
 * You can also pass a context to search within, for example.
 * 
 *     var el = $('div#contactForm');
 *     $('div p', el);
 * 
 * The elements are placed within the Spark object. The object is then assigned a length so you can treat it as an array. There is also an array of elements located in the `elements` section of the object.
 * 
 * You can also pass element objects to it and they will be adopted. If you pass an event object it will adopt the events target.
 * 
 * @param {String} parameters The CSS selector string to your required elements
 * @param {Object} context The element you wish to start the search from, defaults to document
 * @returns {Object} Returns the Spark object to allow chaining
 */
Spark.extend('find', function(parameters, context) {
	// Initialise any required variables
	var that = this.clone(),
		expressionStrings = {
			'any': '\\*',
			'tag': '([a-z0-9]+)',
			'attribute': '\\[([a-z_:][a-z0-9_:\\.\\-]+)\\]',
			'attribute-equals': '\\[([a-z_:][a-z0-9_:\\.\\-]*)=[\'"](.*)[\'"]\\]'
		},
		expressions = {};
	
	// Loop over the expressions compiling them
	this.each(function(expression, name) {
		// Add the start of string anchor
		expression += '^';
		
		// Compile the regexs
		expressions[name] = {
			find: new RegExp(expression, 'i'),
			replace: new RegExp(expression + '.*', 'i')
		};
	}, expressionStrings);
	
	// Return the Spark object to allow chaining
	return that;
};
