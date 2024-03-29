/**
 * Manually fire events assigned to elements
 * 
 * For example, to trigger a click event on all p elements you would use the following line
 * 
 *     $('p').triggerEvent('click');
 * 
 * @param {String} type Name of the event you wish to trigger
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('triggerEvent', function(type) {
	// Initialise any required variables
	var trigger = null;
	
	// Loop through all of the elements
	this.each(function(e) {
		// Check for createEventObject
		if(document.createEventObject) {
			// Trigger for Internet Explorer
			trigger = document.createEventObject();
			e.fireEvent('on' + type, trigger);
		}
		else {
			// Trigger for the good browsers
			trigger = document.createEvent('HTMLEvents');
			trigger.initEvent(type, true, true);
			e.dispatchEvent(trigger);
		}
	});
	
	// Return the Spark object for chaining
	return this;
});
