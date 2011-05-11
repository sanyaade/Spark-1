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
 * @param {String} selector The CSS selector string to your required elements
 * @param {Object} context The element you wish to start the search from, defaults to document
 * @returns {Object} Returns the Spark object to allow chaining
 */
Spark.extend('find', function(selector, context) {
	// Initialise any required variables
	var that = this.clone(),
		expressionStrings = {
			'any': '\\*',
			'tag': '([a-z0-9]+)',
			'attribute': '\\[([a-z_:][a-z0-9_:\\.\\-]+)\\]',
			'attribute-equals': '\\[([a-z_:][a-z0-9_:\\.\\-]*)=[\'"](.*)[\'"]\\]',
			'attribute-equals-whitespace': '\\[([a-z_:][a-z0-9_:\\.\\-]*)~=[\'"](.*)[\'"]\\]',
			'attribute-equals-start': '\\[([a-z_:][a-z0-9_:\\.\\-]*)^=[\'"](.*)[\'"]\\]',
			'attribute-equals-end': '\\[([a-z_:][a-z0-9_:\\.\\-]*)$=[\'"](.*)[\'"]\\]',
			'attribute-equals-contains': '\\[([a-z_:][a-z0-9_:\\.\\-]*)\\*=[\'"](.*)[\'"]\\]',
			'attribute-equals-hyphen': '\\[([a-z_:][a-z0-9_:\\.\\-]*)|=[\'"](.*)[\'"]\\]',
			'root': ':root',
			'nth-child': ':nth-child\\(([0-9\\+\\-n]+|odd|even)\\)',
			'nth-last-child': ':nth-last-child\\(([0-9\\+\\-n]+|odd|even)\\)',
			'nth-of-type': ':nth-of-type\\(([0-9\\+\\-n]+|odd|even)\\)',
			'nth-last-of-type': ':nth-last-of-type\\(([0-9\\+\\-n]+|odd|even)\\)',
			'first-child': ':first-child',
			'last-child': ':last-child',
			'first-of-type': ':first-of-type',
			'last-of-type': ':last-of-type',
			'only-child': ':only-child',
			'only-of-type': ':only-of-type',
			'lang': ':lang\\(([a-z]+)\\)',
			'class': '\\.(-?[_a-z]+[_a-z0-9-]*)',
			'id': '#([a-z][:\\._a-z0-9-]*)',
			'not': ':not\\((.*?)\\)',
			'child': '>',
			'sibling': '~',
			'adjacent-sibling': '\\+'
		},
		expressions = {},
		currentContext = null,
		selectors = null;
	
	// Loop over the expressions compiling them
	this.each(function(expression, name) {
		// Add the start of string anchor
		expression = '^' + expression;
		
		// Compile the regexs
		expressions[name] = {
			find: new RegExp(expression, 'i'),
			replace: new RegExp(expression + '.*', 'i')
		};
	}, expressionStrings);
	
	// Put spaces round child, sibling and adjacent selectors, remove masses of spaces, remove spaces from around commas and finally trim it
	selector = selector.replace(/(>|~|\+)/g, ' $1 ').replace(/\s+/g, ' ').replace(/\s*,\s*/, ',').replace(/^\s+|\s+$/g, '');
	
	// Split the selectors
	selectors = selector.split(',');
	
	// Loop over the selectors
	this.each(function(selector) {
		// Get the context
		currentContext = context || document;
	}, selectors);
	
	// Return the Spark object to allow chaining
	return that;
});
