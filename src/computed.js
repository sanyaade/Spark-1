/**
 * Retrieves the specified computed style from the first element in the list.
 * 
 * If you wanted to get the computed height of a specified div you would use the following line.
 * 
 *     $('div#chat').computed('height');
 * 
 * @param {String} name The name of the computed style you require
 * @returns {String} The computed style of the first element in the element list
 */
Spark.extend('computed', function(name) {
	// If we can use getComputedStyle
	if(typeof getComputedStyle !== 'undefined') {
		// Return getComputedStyle
		return getComputedStyle(this[0], null)[name];
	}
	
	// Otherwise return currentStyle
	return this[0].currentStyle[name];
});