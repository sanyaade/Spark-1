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
		var cookies = document.cookie.split(';'),
			i = null,
			cookie = null,
			nameEQ = name + '=';
		
		// Loop through all the cookies
		for(i = 0; i < cookies.length; i++) {
			// Grab the current cookie and trim any whitespace
			cookie = cookies[i].replace(/^\s+|\s+$/g, '');
			
			// Check if the cookie contains the name
			if(cookie.indexOf(nameEQ + '=') === 0) {
				return cookie.substring(nameEQ.length, cookie.length);
			}
		}
		
		// Return false if we did not find it
		return false;
	}
	
	// Check if we need to get or set
	if(typeof content === 'undefined') {
		return getCookie(name);
	}
});