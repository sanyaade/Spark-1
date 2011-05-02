/**
 * Extendible object of transitions for use with the show and hide functions
 */
Spark.extend('transitions', {
	show: {
		fade: function(element) {
			// Show the element, set its opacity to 0 and fade its opacity to 1
			element.show().style('opacity', 0).animate({
				opacity: 1
			});
		}
	},
	hide: {
		
	}
});