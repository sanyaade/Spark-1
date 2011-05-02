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
		},
		slide: function(element) {
			// Show the element and grab its height
			var original = element.show().style('height');
			
			// Set the height to 0 and the overflow to hidden and then slide it to its original
			element.style({
				height: 0,
				overflow: 'hidden'
			}).animate({
				height: original
			});
		}
	},
	hide: {
		
	}
});