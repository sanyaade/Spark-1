/**
 * The JSON object can strigify or parse JSON.
 */

/** @private */
Spark.extend('json', {
	parse: function(json) {
		// Check that the JSON string is okay
		if(/^[\],:{}\s]*$/.test(json.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
			// It is, parse and return
		    return eval('(' + json + ')');
		}
		else {
			// It is not, return false
			return false;
		}
	},
	
	stringify: function(data, key) {
		// Initialise any required variables
		var i = null,
			built = '',
			 meta = {
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'
			},
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		
		/**
		 * Returns the JSON correctly
		 * 
		 * @param {String} str The JSON string
		 * @returns {String} The correct JSON string with keys included if required
		 * @private
		 */
		function ret(str) {
			return (key) ? '"' + key + '":' + str : str;
		}
		
		/**
		 * Escapes certain characters out of the string
		 * 
		 * @param {String} string The string with characters that need to be escaped
		 * @returns {String} The escaped string
		 * @private
		 */
		function esc(string) {
			// Escape characters
			escapable.lastIndex = 0;
			return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
				var c = meta[a];
				return typeof c === 'string' ? c :
				'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' : '"' + string + '"';
		}
		
		// Check what it is
		if(data instanceof Array) {
			// Loop through the array
			for(i = 0; i < data.length; i++) {
				built += this.stringify(data[i]) + ',';
			}
			
			return ret('[' + built.slice(0, built.length - 1) + ']');
		}
		else if(typeof data === 'object') {
			// Loop through the object
			for(i in data) {
				// Check the value is not a prototype
				if(data.hasOwnProperty(i)) {
					built += this.stringify(data[i], i) + ',';
				}
			}
			
			return ret('{' + built.slice(0, built.length - 1) + '}');
		}
		else if(typeof data === 'string') {
			// Return the string
			return ret(esc(data));
		}
		else {
			// Return anything else (numbers, booleans etc) as a string
			return ret(data.toString());
		}
	}
});
