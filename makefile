# Set the source directory
source = src/

# Create the list of files
files = ${source}core.js

# Set the default files to be built
default: spark.js spark.min.js

# Combine all of the files into spark-dev.js
spark.js: ${files}
	cat > $@ $^

# Compress spark-dev.js into spark.js
spark.min.js: spark-dev.js
	java -jar compiler.jar --js $^ --js_output_file $@