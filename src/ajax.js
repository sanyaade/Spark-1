Spark.extend('ajax', {
	/**
	 * Selects what AJAX object to use
	 * 
	 * @returns {Object} The correct AJAX object for this browser
	 */
	initialise: function() {
		// Pass back the correct object
		return (typeof XMLHttpRequest === 'undefined') ? 
			new ActiveXObject('Microsoft.XMLHTTP') :
			new XMLHttpRequest();
	},
	/**
	 * Perform a get request with optional parameters either syncronously or asyncronously
	 * 
	 * @param {String} file Path of the target file
	 * @param {Object} parameters The arguments you wish to pass to the file
	 * @param {Function} callback If set, the call become asyncronous and the data is passed to it on completion
	 * @returns {String} The data retrived from the file if it is a syncronous call
	 */
	get: function(file, parameters, callback) {
		// Initialise any required variables
		var p = null;
		
		// Set up the AJAX object
		var req = this.initialise();
		
		// Prepare the filename for the parameters
		file += '?';
		
		// Loop through the parameters appending them to the filename
		for(p in parameters) {
			// Make sure it is not a prototype
			if(parameters.hasOwnProperty(p) === true) {
				// Add the parameter
				file += p + '=' + parameters[p];
			}
		}
	},
	/**
	 * Perform a post request with optional parameters either syncronously or asyncronously
	 * 
	 * @param {String} file Path of the target file
	 * @param {Object} parameters The arguments you wish to pass to the file
	 * @param {Function} callback If set, the call become asyncronous and the data is passed to it on completion
	 * @returns {String} The data retrived from the file if it is a syncronous call
	 */
	post: function(file, parameters, callback) {
		
	}
});
