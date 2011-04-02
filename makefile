# Set the source directory
source = src/

# Create the list of files
files = ${source}core.js

# Set the default files to be built
default: spark.js spark.min.js validate

# Combine all of the files into spark.js
spark.js: ${files}
	@@echo 'Building...'
	@@cat > $@ $^

# Compress spark.js into spark.min.js
spark.min.js: spark.js
	@@echo 'Compressing...'
	@@java -jar build/compiler.jar --js $^ --js_output_file $@

# Validate spark.js with jshint
validate:
	@@echo 'Validating...'
	@@node build/validate.js