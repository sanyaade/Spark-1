/**
 * Load external JavaScript files into the document
 */
Spark.extend('load', function(file) {
	// Add the script tag
	this.find('head').insertElement('script', false, {
		type: 'text/javascript',
		src: file
	});
});