/**
 * The cookie function is used to set or get cookies. To get the contents of a cookie simply call the function and provide the name of the cookie you wish to get the contents of. For example.
 * 
 *     // Returns the content of the cookie 'foo'
 *     Spark.cookie('foo');
 * 
 * To set a cookie you just have to pass some content along with a name, like so.
 * 
 *     // Sets the cookie 'foo' to 'bar'
 *     Spark.cookie('foo', 'bar');
 * 
 * You can also provide an optional duration which is how long the cookie should last for in milliseconds. If you do not provide a duration it will expire when the session ends. Say you wanted to set the previous cookie and make it last for five seconds, you would use the following line.
 * 
 *     // Sets a cookie that lasts five seconds
 *     Spark.cookie('foo', 'bar', 5000);
 * 
 * @param {String} name The name of the cookie you wish to get or set
 * @param {String} content If passed the cookie will be set with this as it's content
 * @param {Number} duration The amount of milliseconds you wish the cookie to last for, if not set then it will last for the session
 * @returns {String} The content of the cookie who's name you specified
 */
Spark.extend('cookie', function(name, content, duration) {
	// Initialise any required variables
	var cookies = document.cookie.split(';'),
		i = null,
		cookie = null,
		date = new Date();
	
	// Check if we need to get or set
	if(typeof content === 'undefined') {
		// Get the cookie
		// Loop through all the cookies
		for(i = 0; i < cookies.length; i++) {
			// Grab the current cookie and trim any whitespace
			cookie = cookies[i].replace(/^\s+/g, '');
			
			// Check if the cookie contains the name
			if(cookie.indexOf(name + '=') === 0) {
				return cookie.substring(name.length + 1, cookie.length);
			}
		}
		
		// Return false if we did not find it
		return false;
	}
	else {
		// Set the cookie
		// Check for a passed duration
		if(typeof duration !== 'undefined') {
			// Add on the duration
			date.setTime(date.getTime() + duration);
			expires = '; expires=' + date.toGMTString();
		}
		else {
			// Otherwise set the expires to nothing
			expires = '';
		}
		
		// Set the cookie
		document.cookie = name + '=' + escape(content) + expires + '; path=/';
	}
});
