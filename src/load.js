/**
 * Load external JavaScript files into the document
 * 
 * For example, to load a Spark plugin into the document you would use the following line.
 * 
 *     Spark.load('http://somesite/AwesomeSparkPlugin.js');
 * 
 * If you pass a callback then that will be run as soon as the script has loaded.
 * 
 *     Spark.load('http://somesite/AwesomeSparkPlugin.js', function() {
 *         alert('Plugin loaded!');
 *     });
 * 
 * @param {String} file Path to the script you want to load
 */
Spark.extend('load', function(file, fn) {
	// Initialise any required variables
	var time = new Date().getTime(),
		el = null;
	
	// Add the script tag
	this.find('head').insertElement('script', false, {
		type: 'text/javascript',
		src: file,
		rel: time
	});
	
	// Grab the element
	el = Spark.find('head script[src="' + file + '"][rel="' + time + '"]');
	
	// Add the listener for it being done if they passed the fn argument
	if(typeof fn === 'function') {
		el
			.addEvent('load', fn)
			.addEvent('readystatechange', function(e) {
				if(e.target.readyState === 'loaded') {
					fn();
				}
			});
	}
});
