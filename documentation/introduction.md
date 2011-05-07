[Spark](http://sparkjs.co.uk/) is a lightweight JavaScript library written by [Oliver Caldwell](http://flowdev.co.uk/). The repository is located on GitHub at [SparkJS/Spark](https://github.com/SparkJS/Spark).

Below you will find documentation for all of the functions.

## Plugins

Writing plugins to add functionality to Spark is easy. All you have to do is use the extend method. Like so.

    Spark.extend('myPluginName', function() {
        // Your code goes here
    });

If you want to allow your plugin to be chained you just have to return `this`.

    Spark.extend('myPluginName', function() {
        // Enable chaining
        return this;
    });

You should use `this.each` to loop over all of the elements, define all variables at the top of your function and create a JSDoc comment.

Here is an example debug plugin.

    /**
     * Logs the specified value of all found elements
     * 
     * This will output the class name of all p tags on the page
     * 
     *     $('p').debug('className');
     * 
     * @param {String} value Name of the value you wish to log
     * @returns {Object} Spark object for chaining
     */
    Spark.extend('debug', function(value) {
        // Initialise any required variables
        var output = [];
        
        // Loop over all elements
        this.each(function(e) {
            // Push the value
            output.push(e[value]);
        });
        
        // Show the output
        console.log(output);
        
        // Enable chaining
        return this;
    });