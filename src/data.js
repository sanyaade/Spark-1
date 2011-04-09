Spark.extend('data', {
	keys: [],
	data: [],
	instance: this,
	
	/**
	 * Get the key id for the specified element
	 * 
	 * @param {Object} e The element you need to search for
	 * @returns {Boolean|Number} It will return false if not found or the key ID if successful
	 */
	search: function(e) {
		// Initialise any required variables
		var i = null;
		
		// Loop through all of the keys checking for our element
		for(i = 0; i < this.keys.length; i++) {
			if(this.keys[i] === e) {
				// Found it, return the location
				return i;
			}
		}
		
		// Default to returning false
		return false;
	},
	
	/**
	 * Assigns data to the elements located in the Spark instance
	 * 
	 * @param {String} name The name you wish to assign your data under
	 * @param {Mixed} data The variable you wish to assign, it can be anything
	 */
	set: function(name, data) {
		// Initialise any required variables
		var i = null,
			e = null,
			target = null,
			instance = this.instance;
		
		// Check that we have some elements to work with
		if(instance.elements instanceof Array) {
			// Loop through all of the elements grabbing the current one
			for(i = 0; i < instance.length; i++) {
				e = instance[i];
				
				// Search for the element
				target = this.search(e);
				
				// Check if we have not found our element
				if(target === false) {
					// Set the target to the new location
					target = this.keys.length;
					
					// Add the element to the keys
					this.keys.push(e);
				}
				
				// Assign the data
				this.data[target][name] = data;
			}
		}
		
		// Return the Spark object for chaining
		return instance;
	},
	
	/**
	 * Retrieve data from the elements located in the Spark instance
	 * 
	 * @param {String} name The name of the data you wish to retrieve
	 * @param {Function} fn A function you wish the retrieved data to be passed to, if not found it will pass false
	 */
	get: function(name, fn) {
		// Initialise any required variables
		var i = null,
			e = null,
			target = null,
			found = null,
			instance = this.instance;
		
		// Check that we have some elements to work with
		if(instance.elements instanceof Array) {
			// Loop through all of the elements grabbing the current one
			for(i = 0; i < instance.length; i++) {
				e = instance[i];
				
				// Search for the element
				target = this.search(e);
				
				// Check if we have not found our element in the keys
				if(target === false) {
					// Prepare to pass false back to the callback
					found = false;
				}
				else {
					// We found it, so prepare to pass the found data to the callback
					found = (this.data[target][name]) ? this.data[target][name] : false;
				}
				
				// Pass what we found to the callback
				fn(found);
			}
		}
		
		// Return the Spark object for chaining
		return instance;
	}
});
