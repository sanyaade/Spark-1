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
				built += escape(p) + '=' + escape(parameters[p]) + '&';
			}
		}
		
		// Remove the trailing ampersand and return the escaped string
		return built.slice(0, built.length - 1);
	},
	
	/**
	 * Pass the data to the callback when the request is complete
	 * 
	 * @param {Object} req The AJAX request object
	 * @param {Function} callback The callback function that the data should be passed to
	 */
	handleCallback: function(req, callback) {
		// Listen for the change in state
		req.onreadystatechange = function() {
			// Check if it is finished
			if(req.readyState === 4) {
				// Check the status
				if(req.status === 200) {
					// It's all good, Pass the data to the callback
					callback(req.responseText);
				}
				else {
					// There was an error so pass false to the callback
					callback(false);
				}
			}
		};
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
		
		// Make sure parameters is an object
		if(typeof parameters === 'object') {
			// Add the parameters to the file name
			file += '?' + this.buildParameterString(parameters);
		}
		
		// Check for the callback
		if(typeof callback === 'function') {
			// It exists, so pass it to the callback handling function
			this.handleCallback(req, callback);
		}
		
		// Open the request, if the callback is set then make it asyncronous
		req.open('GET', file, (typeof callback === 'function') ? true : false);
		
		// Send the request
		req.send();
		
		// Check if the callback has not been passed
		if(typeof callback === 'undefined') {
			if(req.status === 200) {
				// Just return the content because it was a syncronous request
				return req.responseText;
			}
			else {
				// There was an error so return false
				return false;
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
