Spark.extend('dataMeta', {
	keys: [],
	data: []
});

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
