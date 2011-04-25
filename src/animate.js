/**
 * Animate styles of the specified elements
 * 
 * @param {String|Object} style Name of the style you wish to animate
 * @param {String|Number} to Only required if style is a string, the target to animate to. If it is a number it will append px as the unit
 * @returns {Object} Returns the Spark object for chaining
 */
Spark.extend('animate', function(style, to) {
	// Initialise any required variables
	var that = this,
		from = null,
		unit = null,
		difference = null,
		fps = 50,
		easingMethods = {
			inQuad: function (t, b, c, d) {
				return c*(t/=d)*t + b;
			},
			outQuad: function (t, b, c, d) {
				return -c *(t/=d)*(t-2) + b;
			},
			inOutQuad: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t + b;
				}
				return -c/2 * ((--t)*(t-2) - 1) + b;
			},
			inCubic: function (t, b, c, d) {
				return c*(t/=d)*t*t + b;
			},
			outCubic: function (t, b, c, d) {
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			inOutCubic: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t*t + b;
				}
				return c/2*((t-=2)*t*t + 2) + b;
			},
			inQuart: function (t, b, c, d) {
				return c*(t/=d)*t*t*t + b;
			},
			outQuart: function (t, b, c, d) {
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			inOutQuart: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t*t*t + b;
				}
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			},
			inQuint: function (t, b, c, d) {
				return c*(t/=d)*t*t*t*t + b;
			},
			outQuint: function (t, b, c, d) {
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			inOutQuint: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return c/2*t*t*t*t*t + b;
				}
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			},
			inSine: function (t, b, c, d) {
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			outSine: function (t, b, c, d) {
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			inOutSine: function (t, b, c, d) {
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			},
			inExpo: function (t, b, c, d) {
				return (t === 0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			outExpo: function (t, b, c, d) {
				return (t === d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			inOutExpo: function (t, b, c, d) {
				if(t === 0) {
					return b;
				}
				else if(t === d) {
					return b + c;
				}
				else if((t/=d/2) < 1) {
					return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				}
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			inCirc: function (t, b, c, d) {
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			outCirc: function (t, b, c, d) {
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			inOutCirc: function (t, b, c, d) {
				if ((t/=d/2) < 1) {
					return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				}
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			},
			inElastic: function (t, b, c, d, a, p) {
				var s = null;
				if(t === 0) {
					return b;
				} 
				else if((t/=d) === 1) {
					return b+c;
				}
				if(!p) {
					p=d*0.3;
				}
				if(a < Math.abs(c)) {
					a=c;
					s=p/4;
				}
				else {
					a = Math.abs(c);
					s = p/(2*Math.PI) * Math.asin(c/a);
				}
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			outElastic: function (t, b, c, d, a, p) {
				var s = null;
				if(t === 0) {
					return b;
				}
				else if((t/=d) === 1) {
					return b+c;
				}
				else if (!p) {
					p=d*0.3;
				}
				if(a < Math.abs(c)) {
					a=c;
					s=p/4;
				}
				else {
					a=Math.abs(c);
					s= p/(2*Math.PI) * Math.asin (c/a);
				}
				return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
			},
			inOutElastic: function (t, b, c, d, a, p) {
				var s = null;
				if (t === 0) {
					return b;
				}
				else if ((t/=d/2) === 2) {
					return b+c;
				}
				else if (!p) {
					p=d*(0.3*1.5);
				}
				if (a < Math.abs(c)) {
					a=c;
					s=p/4;
				}
				else {
					a=Math.abs(c);
					s= p/(2*Math.PI) * Math.asin (c/a);
				}
				if (t < 1) {
					return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				}
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
			},
			inBack: function (t, b, c, d, s) {
				if(typeof s === 'undefined') {
					s = 1.70158;
				}
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			outBack: function (t, b, c, d, s) {
				if (typeof s === 'undefined') {
					s = 1.70158;
				}
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			inOutBack: function (t, b, c, d, s) {
				if (typeof s === 'undefined') {
					s = 1.70158;
				}
				if ((t/=d/2) < 1) {
					return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				}
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			},
			inBounce: function (t, b, c, d) {
				return c - this.outBounce (d-t, 0, c, d) + b;
			},
			outBounce: function (t, b, c, d) {
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} 
				else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
				} 
				else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
				}
				else {
					return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
				}
			},
			inOutBounce: function (t, b, c, d) {
				if (t < d/2) {
					return this.inBounce (t*2, 0, c, d) * 0.5 + b;
				}
				return this.outBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
			}
		};
	
	// Check if we need to perform multiple animations
	if(typeof style === 'object') {
		// Loop over the animations calling them
		this.each(function(t, s) {
			that.animate(s, t);
		}, style);
	}
	else {
		// Loop through all the elements
		this.each(function(e) {
			// Grab where we need to animate from
			from = that.find(e).style(style);
			
			// Get the unit if the to is a string
			if(typeof to === 'string') {
				unit = to.replace(/[^%|in|cm|mm|em|ex|pt|pc|px]/gi, '');
			}
			else {
				// Otherwise set it to an empty string
				unit = '';
			}
			
			// Turn the to and from into an integer
			to = parseFloat(to);
			from = parseFloat(from);
			
			// Work out the difference per frame
			difference = (to - from) / fps;
		});
	}
	
	// Return the Spark object
	return this;
});
