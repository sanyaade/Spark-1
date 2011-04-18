/**
 * Load external JavaScript files into the document
 * 
 * For example, to load a Spark plugin into the document you would use the following line.
 * 
 *     Spark.load('http://somesite/AwesomeSparkPlugin.js');
 * 
 * @param {String} file Path to the script you want to load
 */
Spark.extend('load', function(file) {
	// Add the script tag
	this.find('head').insertElement('script', false, {
		type: 'text/javascript',
		src: file
	});
});