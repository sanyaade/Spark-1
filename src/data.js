/**
 * This is used to store the keys and data
 */
Spark.extend('dataMeta', {
	keys: [],
	data: []
});

/**
 * Assigns data to an element via keys
 * 
 * @param {String} name The name of the data you wish to get or set
 * @param {Mixed} data The data you wish to assign, if not provided then the data is returned
 * @returns {Mixed} If it fails, it will return false, if it succeeds it will return true. If it succeeds in finding data it will return that data
 */
Spark.extend('data', function(name, data) {
	// Initialise any required variables
	var i = null,
		e = null,
		target = null,
		found = null;
	
	// Check that we have an element to work with
	if(this.elements instanceof Array) {
		if(typeof this.elements[0] === 'object') {
			// Grab the element
			e = this.elements[0];
			
			// Start the target as false
			target = false;
			
			// Loop through all of the keys checking for our element
			for(i = 0; i < this.dataMeta.keys.length; i++) {
				if(this.dataMeta.keys[i] === e) {
					// Found it, assign it to the target
					target = i;
				}
			}
			
			// Check if data was passed
			if(typeof data !== 'undefined') {
				// We have data
				// Check if we found an element
				if(target === false) {
					// We did not, create it and set the target
					target = this.dataMeta.keys.length;
					this.dataMeta.keys.push(e);
					this.dataMeta.data.push({});
				}
				
				// Assign the data
				this.dataMeta.data[target][name] = data;
				
				// Return true because it worked
				return true;
			}
			else {
				// We do not have data
				// Check if we found an element
				if(target === false) {
					// We did not, return false
					return false;
				}
				
				// We now return the found data
				return this.dataMeta.data[target][name];
			}
		}
	}
	
	// Return false bacause there is nothing to use
	return false;
});