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
		// Set up the AJAX object
		var req = this.initialise();
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
