/**
 * The AJAX object contains two functions, `get` and `post`.
 * You can call these functions like so.
 * 
 *     Spark.ajax.get('foo.json');
 *     Spark.ajax.post('foo.json');
 * 
 * The above examples are synchronous requests, to perform an asynchronous request you must pass a callback, like so.
 * 
 *     Spark.ajax.post('foo.json', false, function(data) {
 *         console.log(data);
 *     });
 * 
 * The argument passed to the callback, in this case data, contains the data retrieved from the specified file. If the request failed then the passed variable will be false. The same goes for synchronous requests, if the request fails, it will return false.
 * 
 * The second argument is for the parameters, if false no parameters will be sent. Here is an example of getting a file asynchronously with a parameter and a check to make sure the request worked.
 * 
 *     Spark.ajax.get('foo.json', {
 *         foo: 'bar'
 *     }, function(data) {
 *         if(data) {
 *             console.log(data);
 *         }
 *         else {
 *             console.log('An error occurred.');
 *         }
 *     });
 */

/** @private */
Spark.extend('ajax', {
	/**
	 * Selects what AJAX object to use
	 * 
	 * @returns {Object} The correct AJAX object for this browser
	 * @private
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
	 * @private
	 */
	buildParameterString: function(parameters) {
		// Initialise any required variables
		var p = null,
			built = '';
		
		// Loop through the parameters appending them to the filename
		for(p in parameters) {
			// Make sure it is not a prototype
			if(parameters.hasOwnProperty(p)) {
				// Add the parameter
				built += encodeURIComponent(p) + '=' + encodeURIComponent(parameters[p]) + '&';
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
	 * @private
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
     * Perform a get request with optional parameters either synchronously or asynchronously
     * 
     * @param {String} file Path of the target file
     * @param {Object} parameters The arguments you wish to pass to the file
     * @param {Function} callback If set, the call become asynchronous and the data is passed to it on completion, it will pass false if it failed
     * @returns {String|Boolean} The data retrieved from the file if it is a synchronous call, returns false if it failed
     */
	get: function(file, parameters, callback) {
		// Set up the AJAX object
		var req = this.initialise();
		
		// Make sure parameters is an object
		if(parameters) {
			// Add the parameters to the file name
			file += '?' + this.buildParameterString(parameters);
		}
		
		// Check for the callback
		if(callback) {
			// It exists, so pass it to the callback handling function
			this.handleCallback(req, callback);
		}
		
		// Open the request, if the callback is set then make it asyncronous
		req.open('GET', file, typeof callback === 'function');
		
		// Send the request
		req.send();
		
		// Check if the callback has not been passed
		if(!callback) {
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
     * Perform a post request with optional parameters either synchronously or asynchronously
     * 
     * @param {String} file Path of the target file
     * @param {Object} parameters The arguments you wish to pass to the file
     * @param {Function} callback If set, the call become asynchronous and the data is passed to it on completion, it will pass false if it failed
     * @returns {String|Boolean} The data retrieved from the file if it is a synchronous call, returns false if it failed
     */
	post: function(file, parameters, callback) {
		// Set up the AJAX object
		var req = this.initialise();
		
		// Check for the callback
		if(callback) {
			// It exists, so pass it to the callback handling function
			this.handleCallback(req, callback);
		}
		
		// Open the request, if the callback is set then make it asyncronous
		req.open('POST', file, typeof callback === 'function');
		
		// Set the headers
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		
		// Only send the data if it is set
		if(parameters) {
			req.send(this.buildParameterString(parameters));
		}
		else {
			req.send();
		}
		
		// Check if the callback has not been passed
		if(!callback) {
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
	 * Load a JSON file and pass it to the callback function
	 * 
     * @param {String} file Path of the target file
     * @param {Object} parameters The arguments you wish to pass to the file
     * @param {Function} callback If set, the call become asynchronous and the data is passed to it on completion, it will pass false if it failed
     * @returns {String|Boolean} The data retrieved from the file if it is a synchronous call, returns false if it failed
	 */
	getJSON: function(file, parameters, callback) {
		// Initialise any required variables
		var params = false;
		
		// Get the parameter string if required
		if(parameters) {
			params = this.buildParameterString(parameters);
		}
		
		// Load the file
		Spark.load(file + '?callback=' + callback + ((params) ? '&' + params : ''));
	}
});
