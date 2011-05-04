/** 
 * Toggle the visibility of the specified elements
 * 
 * For example, to toggle the visibility of all p tags on the page, you would use the following line
 * 
 *     $('p').toggle();
 * 
 * To fade the elements in, you would specify the fade transition as the optional argument
 * 
 *     $('p').show('fade');
 * 
 * You can also pass a function as the second argument to be run when the transition completes, like so
 * 
 *     $('p').toggle('fade', function() {
 *         alert('done');
 *     });
 * 
 * This function takes the originial display type into account.
 * 
 * @param {String} transition Optional name of the transition to use to toggle. Default transitions are: fade, slide and smooth
 * @param {Function} callback Optional function to be run after the transition completes
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('toggle', function(transition, callback) {
	// Initialise any required variables
	var that = this,
		element = null;
	
	// Loop through the elements
	this.each(function(e) {
		// Grab the element
		element = that.find(e);
		
		// Check wether it is display none or not
		if(element.style('display') === 'none') {
			// It is, show it
			element.show(transition, callback);
		}
		else {
			// It is not, hide it
			element.hide(transition, callback);
		}
	});
	
	// Return the Spark object
	return this;
});
