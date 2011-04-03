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
	 * Turns an object of parameters into a string
	 * 
	 * @param {Object} parameters An object of parameters
	 * @returns {String} The combined string, ready to be appended to a filename
	 */
	buildParameterString: function(parameters) {
		// Initialise any required variables
		var p = null,
			built = '';
		
		// Loop through the parameters appending them to the filename
		for(p in parameters) {
			// Make sure it is not a prototype
			if(parameters.hasOwnProperty(p) === true) {
				// Add the parameter
				built += p + '=' + parameters[p] + '&';
			}
		}
		
		// Remove the trailing ampersand and return
		return built.slice(0, built.length - 1);
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
		// Set up the AJAX object
		var req = this.initialise();
		
		// Add the parameters to the file name
		file += '?' + this.buildParameterString(parameters);
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
