// Include fs
var fs = require('fs');

// Include jshint
var jshint = require('./jshint').JSHINT;

// Load the script
fs.readFile('../spark.js', function(err, data) {
	// Check for errors
	if(err) {
		// Throw the error
		throw err;
	}
	else {
		// Run jshint
		var result = jshint(data, {
			curly: true,
			eqeqeq: true,
			forin: true
		});
	}
});