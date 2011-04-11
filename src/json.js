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
	}
});
