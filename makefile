# Set the source directory
src = src/

# Create the list of files
files = ${src}core.js\
		${src}ready.js\
		${src}ajax.js\
		${src}cookie.js\
		${src}find.js\
		${src}each.js\
		${src}data.js\
		${src}attribute.js\
		${src}style.js\
		${src}json.js\
		${src}hasClass.js\
		${src}addClass.js\
		${src}removeClass.js\
		${src}addEvent.js\
		${src}removeEvent.js\
		${src}triggerEvent.js\
		${src}createElement.js\
		${src}insertElement.js\
		${src}prependElement.js\
		${src}appendElement.js\
		${src}removeElement.js\
		${src}load.js\
		${src}html.js\
		${src}text.js\
		${src}animate.js\
		${src}hide.js\
		${src}show.js\
		${src}color.js\
		${src}stop.js

# Set the default files to be built
default: spark.js spark.min.js validate

# Set up the develop list of files
# Basically without the compressed version
develop: spark.js validate

# Combine all of the files into spark.js
spark.js: ${files}
	@@echo 'Building...'
	@@cat > $@ $^
	@@echo 'Done!'

# Compress spark.js into spark.min.js
spark.min.js: spark.js
	@@echo 'Compressing...'
	@@java -jar build/compiler.jar --js $^ --js_output_file $@
	@@echo 'Done!'

# Validate spark.js with jshint
validate:
	@@echo 'Validating...'
	@@node build/validate.js
	@@echo 'Done!'

# Generate documentation
document:
	@@echo 'Documenting...'
	@@dox src/* > documentation/index.html -t 'Spark' -i 'documentation/introduction.md'
	@@echo 'Done!'

# Clean the files
clean:
	@@echo 'Cleaning...'
	@@rm spark.js
	@@rm spark.min.js
	@@rm documentation/index.html
	@@echo 'Done!'