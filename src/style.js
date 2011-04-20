/**
 * The style function is used to get or set styles.
 * It takes either one or two arguments, if you pass a name and a value like so.
 * 
 *     $('img').style('width', '100px');
 * 
 * Then it will make all images on the page 100px wide.
 * 
 * You can then retrieve the width of the first image on the page like so.
 * 
 *     $('img').style('width');
 * 
 * If you have multiple styles to set then you can use an object like so.
 * 
 *     $('img').style({
 *         width: '100px',
 *         height: '50px'
 *     });
 * 
 * @param {String|Object} name Either an object of styles or the name of the required style
 * @param {String} value The value to assign to the style if you passed a string, if not passed then it returns the style of the previous name
 * @returns {Object|String} If you are setting it will return the Spark object for chaining, if you are getting then it will return the retrieved style
 */
Spark.extend('style', function(name, value) {
	// Initialise any required variables
	var i = null,
		n = null;
	
	/**
	 * Turns a hyphen seperated style name into a camel case one
	 * 
	 * @param {String} style The style name to convert
	 * @returns {String} The camel case version of the string
	 * @private
	 */
	function camelStyle(style) {
		// Check if we need to camel case
		if(style.indexOf('-') !== -1) {
			// Return the camel cased string
			return style.replace(/-([a-z])/gi, function(s, g1) { return g1.toUpperCase(); });
		}
		
		// Default to returning the string back just as it was
		return style;
	}
	
	/**
	 * Sets the specified style with cross browser adjustments if necessary
	 * 
	 * @param {Object} element The element to alter
	 * @param {String} name The name of the style (can be camel case or hyphen separated)
	 * @param {String} value The value to set
	 * @private
	 */
	function setStyle(element, name, value) {
		name = camelStyle(name);
		
		element.style[name] = value;
		
		if(name === 'opacity') {
			element.style.filter = 'alpha(opacity=' + (parseFloat(value) * 100) + ')';
			element.style.zoom = '1';
			element.style.MozOpacity = value;
			element.style.KhtmlOpacity = value;
		}
	}
	
	/**
	 * Converts any type of colour to rgb
	 * 
	 * @param {String} color Hex, rgb or name of the colour
	 * @returns {String} RGB version of the colour
	 * @private
	 */
	function fixColor(color) {
		// Initialise any required variables
		var i = null,
			hex = [],
			colors = {
				aliceblue: 'rgb(240,248,255)',
				antiquewhite: 'rgb(250,235,215)',
				aqua: 'rgb(0,255,255)',
				aquamarine: 'rgb(127,255,212)',
				azure: 'rgb(240,255,255)',
				beige: 'rgb(245,245,220)',
				bisque: 'rgb(255,228,196)',
				black: 'rgb(0,0,0)',
				blanchedalmond: 'rgb(255,235,205)',
				blue: 'rgb(0,0,255)',
				blueviolet: 'rgb(138,43,226)',
				brown: 'rgb(165,42,42)',
				burlywood: 'rgb(222,184,135)',
				cadetblue: 'rgb(95,158,160)',
				chartreuse: 'rgb(127,255,0)',
				chocolate: 'rgb(210,105,30)',
				coral: 'rgb(255,127,80)',
				cornflowerblue: 'rgb(100,149,237)',
				cornsilk: 'rgb(255,248,220)',
				crimson: 'rgb(220,20,60)',
				cyan: 'rgb(0,255,255)',
				darkblue: 'rgb(0,0,139)',
				darkcyan: 'rgb(0,139,139)',
				darkgoldenrod: 'rgb(184,134,11)',
				darkgray: 'rgb(169,169,169)',
				darkgreen: 'rgb(0,100,0)',
				darkgrey: 'rgb(169,169,169)',
				darkkhaki: 'rgb(189,183,107)',
				darkmagenta: 'rgb(139,0,139)',
				darkolivegreen: 'rgb(85,107,47)',
				darkorange: 'rgb(255,140,0)',
				darkorchid: 'rgb(153,50,204)',
				darkred: 'rgb(139,0,0)',
				darksalmon: 'rgb(233,150,122)',
				darkseagreen: 'rgb(143,188,143)',
				darkslateblue: 'rgb(72,61,139)',
				darkslategray: 'rgb(47,79,79)',
				darkslategrey: 'rgb(47,79,79)',
				darkturquoise: 'rgb(0,206,209)',
				darkviolet: 'rgb(148,0,211)',
				deeppink: 'rgb(255,20,147)',
				deepskyblue: 'rgb(0,191,255)',
				dimgray: 'rgb(105,105,105)',
				dimgrey: 'rgb(105,105,105)',
				dodgerblue: 'rgb(30,144,255)',
				firebrick: 'rgb(178,34,34)',
				floralwhite: 'rgb(255,250,240)',
				forestgreen: 'rgb(34,139,34)',
				fuchsia: 'rgb(255,0,255)',
				gainsboro: 'rgb(220,220,220)',
				ghostwhite: 'rgb(248,248,255)',
				gold: 'rgb(255,215,0)',
				goldenrod: 'rgb(218,165,32)',
				gray: 'rgb(128,128,128)',
				green: 'rgb(0,128,0)',
				greenyellow: 'rgb(173,255,47)',
				grey: 'rgb(128,128,128)',
				honeydew: 'rgb(240,255,240)',
				hotpink: 'rgb(255,105,180)',
				indianred: 'rgb(205,92,92)',
				indigo: 'rgb(75,0,130)',
				ivory: 'rgb(255,255,240)',
				khaki: 'rgb(240,230,140)',
				lavender: 'rgb(230,230,250)',
				lavenderblush: 'rgb(255,240,245)',
				lawngreen: 'rgb(124,252,0)',
				lemonchiffon: 'rgb(255,250,205)',
				lightblue: 'rgb(173,216,230)',
				lightcoral: 'rgb(240,128,128)',
				lightcyan: 'rgb(224,255,255)',
				lightgoldenrodyellow: 'rgb(250,250,210)',
				lightgray: 'rgb(211,211,211)',
				lightgreen: 'rgb(144,238,144)',
				lightgrey: 'rgb(211,211,211)',
				lightpink: 'rgb(255,182,193)',
				lightsalmon: 'rgb(255,160,122)',
				lightseagreen: 'rgb(32,178,170)',
				lightskyblue: 'rgb(135,206,250)',
				lightslategray: 'rgb(119,136,153)',
				lightslategrey: 'rgb(119,136,153)',
				lightsteelblue: 'rgb(176,196,222)',
				lightyellow: 'rgb(255,255,224)',
				lime: 'rgb(0,255,0)',
				limegreen: 'rgb(50,205,50)',
				linen: 'rgb(250,240,230)',
				magenta: 'rgb(255,0,255)',
				maroon: 'rgb(128,0,0)',
				mediumaquamarine: 'rgb(102,205,170)',
				mediumblue: 'rgb(0,0,205)',
				mediumorchid: 'rgb(186,85,211)',
				mediumpurple: 'rgb(147,112,216)',
				mediumseagreen: 'rgb(60,179,113)',
				mediumslateblue: 'rgb(123,104,238)',
				mediumspringgreen: 'rgb(0,250,154)',
				mediumturquoise: 'rgb(72,209,204)',
				mediumvioletred: 'rgb(199,21,133)',
				midnightblue: 'rgb(25,25,112)',
				mintcream: 'rgb(245,255,250)',
				mistyrose: 'rgb(255,228,225)',
				moccasin: 'rgb(255,228,181)',
				navajowhite: 'rgb(255,222,173)',
				navy: 'rgb(0,0,128)',
				oldlace: 'rgb(253,245,230)',
				olive: 'rgb(128,128,0)',
				olivedrab: 'rgb(107,142,35)',
				orange: 'rgb(255,165,0)',
				orangered: 'rgb(255,69,0)',
				orchid: 'rgb(218,112,214)',
				palegoldenrod: 'rgb(238,232,170)',
				palegreen: 'rgb(152,251,152)',
				paleturquoise: 'rgb(175,238,238)',
				palevioletred: 'rgb(216,112,147)',
				papayawhip: 'rgb(255,239,213)',
				peachpuff: 'rgb(255,218,185)',
				peru: 'rgb(205,133,63)',
				pink: 'rgb(255,192,203)',
				plum: 'rgb(221,160,221)',
				powderblue: 'rgb(176,224,230)',
				purple: 'rgb(128,0,128)',
				red: 'rgb(255,0,0)',
				rosybrown: 'rgb(188,143,143)',
				royalblue: 'rgb(65,105,225)',
				saddlebrown: 'rgb(139,69,19)',
				salmon: 'rgb(250,128,114)',
				sandybrown: 'rgb(244,164,96)',
				seagreen: 'rgb(46,139,87)',
				seashell: 'rgb(255,245,238)',
				sienna: 'rgb(160,82,45)',
				silver: 'rgb(192,192,192)',
				skyblue: 'rgb(135,206,235)',
				slateblue: 'rgb(106,90,205)',
				slategray: 'rgb(112,128,144)',
				slategrey: 'rgb(112,128,144)',
				snow: 'rgb(255,250,250)',
				springgreen: 'rgb(0,255,127)',
				steelblue: 'rgb(70,130,180)',
				tan: 'rgb(210,180,140)',
				teal: 'rgb(0,128,128)',
				thistle: 'rgb(216,191,216)',
				tomato: 'rgb(255,99,71)',
				turquoise: 'rgb(64,224,208)',
				violet: 'rgb(238,130,238)',
				wheat: 'rgb(245,222,179)',
				white: 'rgb(255,255,255)',
				whitesmoke: 'rgb(245,245,245)',
				yellow: 'rgb(255,255,0)',
				yellowgreen: 'rgb(154,205,50)'
			};
		
		if(color.indexOf('rgb(') === 0) {
			// It is already RGB
			return color;
		}
		else if(color.indexOf('#') === 0) {
			// It is hex, take off the hash
			color = color.slice(1);
			
			// Convert it to the right length if it is the shorthand
			if(color.length === 3) {
				color = color.replace(/([0-9a-f])/ig, '$1$1');
			}
			
			// Split the string into its main components and convert them to RGB
			for(i = 0; i < 3; i++) {
				hex.push(parseInt(color.slice(i * 2, (i + 1) * 2), 16));
			}
			
			// Return the finished RGB string
			return 'rgb(' + hex.join(',') + ')';
		}
		else {
			// It is a name
		}
	}
	
	/**
	 * Retrieves the specified computed style from the element
	 * 
	 * @param {Object} e Element object to get styles from
	 * @param {String} name The name of the computed style you require
	 * @returns {String} The computed style of the first element in the element list
	 */
	function getStyle(e, name) {
		// Initialise any required variables
		var style = null;
		
		// If we can use getComputedStyle
		if(typeof getComputedStyle !== 'undefined') {
			// Return getComputedStyle
			style = document.defaultView.getComputedStyle(e, null).getPropertyValue(name);
		}
		else {
			// Otherwise return currentStyle
			style = e.currentStyle[name];
		}
		
		// Fix colours
		if(name.toLowerCase().indexOf('color') !== -1) {
			fixColor(style);
		}
		
		// Return the found style, if not found then look in the style property
		return (style) ? style : e.style[name];
	}
	
	
	// Check what kind of variable name is
	if(typeof name === 'string') {
		// Check if they passed a value
		if(typeof value === 'string') {
			// Loop through all elements and assign the style
			for(i = 0; i < this.length; i++) {
				setStyle(this[i], name, value);
			}
		}
		else {
			// Get the style
			return getStyle(this[0], camelStyle(name));
		}
	}
	else if(typeof name === 'object') {
		// Loop through all the styles
		for(n in name) {
			// Check that it is not a prototype
			if(name.hasOwnProperty(n)) {
				// Loop through all elements and assign the style
				for(i = 0; i < this.length; i++) {
					setStyle(this[i], n, name[n]);
				}
			}
		}
	}
	
	// Return the Spark object to allow chaining
	return this;
});
