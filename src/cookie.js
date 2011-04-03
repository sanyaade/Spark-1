/**
 * Gets or sets cookies
 * 
 * @param {String} name The name of the cookie you wish to get or set
 * @param {String} content If passed the cookie will be set with this as it's content
 * @param {Number} duration The amount of miliseconds you wish the cookie to last for, if not set then it will last for the session
 * @returns {String} The content of the cookie whos name you specified
 */
Spark.extend('cookie', function(name, content, duration) {
	/**
	 * Gets the specified cookie
	 * 
	 * @param {String} name The name of the cookie
	 * @returns {String|Boolean} The contents of the cookie or false if it was not found
	 */
	function getCookie(name) {
		// Initialise any required variables
		var cookies = document.cookie.split(';');
	}
});