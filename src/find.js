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
			'not': ':not\\((.*?)\\)'
		},
		expressions = {},
		levels = null,
		first = null,
		i = null,
		tempChild = null,
		found = [],
		methods = {
			any: function() {
				// Return all elements in the DOM
				return document.all || document.getElementsByTagName('*');
			},
			convertList: function(list) {
				// Initialise any required variables
				var converted = [];
				
				// Convert a node list to an array
				for(i = 0; i < list.length; i++) {
					converted.push(list[i]);
				}
				
				return converted;
			}
		};
	
	// If selector is an object, adopt it and return
	if(typeof selector === 'object') {
		that[0] = selector;
		that.length = 1;
		that.elements = [selector];
		
		return that;
	}
	
	// Make sure we have a context
	if(!context) {
		context = that.elements || [document];
	}
	
	// Does the hard work of searching
	function findElements(selector) {
		// Set up the array to be returned
		var found = [];
		
		// Loop over the selector until there is nothing left
		while(selector.length > 0) {
			if(expressions.any.find.test(selector)) {
				// If there are no found, add all elements
				if(found.length === 0) {
					found = methods.any();
				}
				
				selector = selector.replace(expressions.any.replace, '');
			}
			else if(expressions.tag.find.test(selector)) {
				// If there are no found, search for the tag
				if(found.length === 0) {
					found = document.getElementsByTagName(selector.replace(expressions.tag.find, '$1'));
				}
				
				selector = selector.replace(expressions.tag.replace, '');
			}
			else {
				// If the selector does not match anything, return an empty array
				return [];
			}
		}
		
		// Return the found
		return found;
	}
	
	// Checks if an element is a child of any of the parents
	function isChild(child, parents) {
		for(i = 0; i < parents.length; i++) {
			tempChild = child;
			
			while(tempChild.parentNode) {
				tempChild = tempChild.parentNode;
				
				if(tempChild === parents[i]) {
					// Found it!
					return true;
				}
			}
		}
		
		// Return false by default
		return false;
	}
	
	// Checks if an element can go all the way through the path array
	function matchPath(element, path) {
		// Loop through the path
		for(i = 0; i < path.length; i++) {
			// Check if the element is a child of the current path
			if(!isChild(element, path[i])) {
				// It is not, return false
				return false;
			}
		}
		
		// Return true by default
		return true;
	}
	
	// Loop over the expressions compiling them
	that.each(function(expression, name) {
		// Add the start of string anchor
		expression = '^' + expression;
		
		// Compile the regexs
		expressions[name] = {
			replace: new RegExp(expression, 'i'),
			find: new RegExp(expression + '.*', 'i')
		};
	}, expressionStrings);
	
	// Put spaces round child, sibling and adjacent selectors, remove masses of spaces, remove spaces from around commas and finally trim it
	selector = selector.replace(/(>|~|\+)/g, ' $1 ').replace(/\s+/g, ' ').replace(/\s*,\s*/, ',').replace(/^\s+|\s+$/g, '');
	
	// Loop over the selectors
	that.each(function(selector) {
		// Reset levels
		levels = [];
		
		// Loop over the sub selectors
		that.each(function(selector) {
			// Perform the search
			levels.push(findElements(selector));
		}, selector.split(' ').reverse());
		
		// Add the context
		levels.push(context);
		
		// Get the first
		first = levels.splice(0, 1);
		
		// Loop over the elements
		that.each(function(bottom) {
			// Check if it matches the path
			if(matchPath(bottom, levels)) {
				// It does, add it to the found
				found.push(bottom);
			}
		}, first);
	}, selector.split(','));
	
	// Assign the found to that
	that.each(function(e, i) {
		that[i] = e;
	}, found);
	that.length = found.length;
	that.elements = found;
	
	// Return the Spark object to allow chaining
	return that;
});
