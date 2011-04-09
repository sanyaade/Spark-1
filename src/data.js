Spark.extend('data', {
	keys: [],
	data: [],
	
	/**
	 * Assigns data to the elements located in the Spark instance
	 * 
	 * @param {String} name The name you wish to assign your data under
	 * @param {Mixed} data The variable you wish to assign, it can be anything
	 */
	set: function(name, data) {
		// Initialise any required variables
		var i = null,
			e = null;
		
		// Check that we have some elements to work with
		if(typeof this.elements === 'array') {
			// Loop through all of the elements grabbing the current one
			for(i = 0; i < this.length; i++) {
				e = this[i];
			}
		}
		
		// Return the Spark object for chaining
		return this;
	},
	
	/**
	 * Retrieve data from the elements located in the Spark instance
	 * 
	 * @param {String} name The name of the data you wish to retrieve
	 * @param {Function} fn A function you wish the retrieved data to be passed to, if not found it will pass false
	 * @returns {Mixed} Returns either the data you specified or false if you have not provided a function for the data to be passed to
	 */
	get: function(name, fn) {
		
	}
});