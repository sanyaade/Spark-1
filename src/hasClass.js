/**
 * Checks if an element has the specified class.
 * 
 * For example, this will return true, given that there is a div with a class of focus on the page.
 * 
 *     $('div.focus').hasClass('focus');
 * 
 * @param {String} name The class name you want to search for
 * @returns {Boolean} Will return true if it has the class or false if it does not
 */
Spark.extend('hasClass', function(name) {
	// Check for the class
	return new RegExp('\\b' + name + '\\b').test(this.attribute('class'));
});
