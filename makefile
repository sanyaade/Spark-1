# Set the source directory
src = src/

# Create the list of files
files = ${src}core.js\
		${src}ready.js\
		${src}ajax.js\
		${src}cookie.js\
		${src}find.js\
		${src}each.js\
		${src}data.js

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
	@@java -jar build/jsdoc/jsrun.jar build/jsdoc/app/run.js -a -t=build/jsdoc/templates/jsdoc -d=documentation spark.js
	@@echo 'Done!'

# Clean the files
clean:
	@@echo 'Cleaning...'
	@@rm spark.js spark.min.js
	@@rm -rf documentation
	@@echo 'Done!'