// Initialisation
var src = require('fs').readFileSync('spark.js', 'utf8'),
	sys = require('sys'),
	jshint = require('./jshint').JSHINT,
	i = null,
	e = null;

// Run jshint
var result = jshint(src, {
	curly: true,
	eqeqeq: true,
	forin: true,
	browser: true
});

// Check for errors
if(result) {
	// All good baby, baby!
	sys.puts('Validation successful');
}
else {
	// It's the end of the world!
	for(i = 0; i < jshint.errors.length; i++) {
		// Log the error
		e = jshint.errors[i];
		sys.puts(e.raw + ' (' + e.line + ':' + e.character + ')' + "\n" + e.evidence + "\n");
	}
}