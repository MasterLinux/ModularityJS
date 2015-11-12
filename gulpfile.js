var $Gulp = require('gulp'),
    $Babel = require('babel-core'),
    $Browserify = require("browserify"),
    $Uglify = require("uglify-js"),
    $PEG = require("pegjs"),
    $EJS = require("ejs"),
    $Sass = require('node-sass'),
    $FileWalker = require('walk'),
    $Mkdirp = require('mkdirp'),
    $Path = require('path'),
    $FileSystem = require('fs'),
    $KarmaServer = require("karma").Server,
    $ESdoc = require("gulp-esdoc"),
    $JSdoc = require("gulp-jsdoc");

var KARMA_CONFIG = $Path.resolve("./karma.conf.js");

$Gulp.task('build parser', function () {
    // TODO: get all parser and generate each of them
    var parser = new PEGParser("Author", "grammars");
    parser.build().writeTo("src/parser");

    parser = new PEGParser("Version", "grammars");
    parser.build().writeTo("src/parser");
});

$Gulp.task('transform SCSS to CSS', function () {
    var filePath = $Path.join("./", "sass", "modularity.scss");

    var css = $Sass.renderSync({
        file: filePath,
        outputStyle: 'compressed'
    }).css;

    new File("build", "modularity.css").write(css);
});

$Gulp.task('start watching SCSS', function () {
    // TODO: implement
});

$Gulp.task('transform ES6 to ES5', function (done) {
    new SourceTransformer().transform({
        inputDir: "src",
        inputFileName: "modularity",
        outputDir: "build",
        outputFileName: "modularity",
        minify: true,
        done: function (error) {
            if (error) {
                done(error);
            } else {
                done()
            }
        }
    });
});

/**
 * Generate two documentations in different folders.
 */
$Gulp.task('generate documentation', function () {

    // JSDoc
    $Gulp.src("./build/modularity.js")
        .pipe($JSdoc('./build/docs_jsdoc'));

    // ESDoc
    $Gulp.src("./src")
        .pipe($ESdoc({
            destination: "./build/docs_esdoc",
            "includeSource": true
        }));
});

$Gulp.task('start watching JavaScript files and run tests', function (done) {
    var server = new $KarmaServer({
        configFile: KARMA_CONFIG,
        browsers: ["PhantomJS2"],
        reporters: ["progress"],
        singleRun: false,
        autoWatch: true,
        colors: true
    }, function (exitCode) {
        if (exitCode === 0) {
            done();
        } else {
            done(new Error("Karma has exited with " + exitCode));
        }
    });

    server.start();
});

$Gulp.task('run tests', function (done) {
    var server = new $KarmaServer({
        configFile: KARMA_CONFIG,
        browsers: ["PhantomJS2"],
        reporters: ["dots"],
        singleRun: true,
        autoWatch: false,
        colors: false
    }, function (exitCode) {
        if (exitCode === 0) {
            done();
        } else {
            done(new Error("Karma has exited with " + exitCode));
        }
    });

    server.start();
});

//**************************** Utility classes ****************************//

/**
 * Transformer used to transform ES6 to ES5. In addition it
 * allows to generate a minified source file
 * @constructor
 */
function SourceTransformer() {
}

/**
 * Callback which is called if transforming is done
 * @callback SourceTransformer~done
 * @param {Error} [error] - The occurred error or undefined if no error occurred
 */

/**
 * Transforms ECMAScript 6 source code to ECMAScript 5
 * @param {Object} options
 * @param {String} options.inputDir - Path to the src directory
 * @param {String} options.inputFileName - File name (without file extension) of the ES6 file which should be transformed to ES5
 * @param {String} options.outputDir - Path to the destination directory
 * @param {String} options.outputFileName - File name (without file extension) of the transformed ES5 file
 * @param {Boolean} [options.minify=false] - If set to true an additional minified version will be generated
 * @param {SourceTransformer~done} options.done - Callback which is called if transforming is done
 * @example
 *      var transformer = new SourceTransformer();
 *
 *      transformer.transform({
 *          inputDir: "path/to/src/dir",
 *          inputFileName: "file_name",
 *          outputDir: "path/to/dest/dir",
 *          outputFileName: "file_name",
 *          minify: true,
 *          done: function (error) {
 *              // transforming is done
 *          }
 *      });
 */
SourceTransformer.prototype.transform = function (options) {
    var inputDir = options.inputDir;
    var inputFileName = options.inputFileName;
    var outputDir = options.outputDir;
    var outputFileName = options.outputFileName;
    var shouldMinified = options.minify || false;
    var done = options.done;
    var instance = this;

    console.log("1. Start transforming ES6 to ES5");
    this.transformES6ToES5(inputDir, outputDir);

    console.log("2. Start to make source code browser compatible");
    this.browserify(inputDir, inputFileName, outputDir, outputFileName, function (error) {

        if (!error) {
            if (shouldMinified) {
                console.log("3. Start to minify source code");
                instance.minify(outputDir, inputFileName, outputDir, outputFileName);
            }
            done();

        } else {
            done(error);
        }
    });
};

/**
 * Transforms all ES6 files in the src directory to ES5
 * @param {String} inputDir - Path to the src directory
 * @param {String} outputDir - Path to the destination directory
 */
SourceTransformer.prototype.transformES6ToES5 = function (inputDir, outputDir) {
    var inDir = $Path.join("./", inputDir);

    // get all JavaScript files
    var files = new Directory(inDir).readFiles(function (file) {
        return file.hasExtension(".js");
    });

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var outDir = $Path.join("./", outputDir, file.path);

        // get source code
        var source = file.read();

        // transform to ES5
        source = $Babel.transform(source, {
            modules: "common",
            sourceMaps: false,
            comments: true,
            ast: false
        }).code;

        new File(outDir, file.name).write(source);
    }
};

/**
 * Makes source code browser compatible so it can be executed client-side
 * @param inputDir - Path to the src directory
 * @param inputFileName - File name (without file extension) of the ES5 file which should be transformed
 * @param outputDir - Path to the destination directory
 * @param outputFileName - File name (without file extension) of the browser compatible file
 * @param {SourceTransformer~done} done - Callback which is called if transforming is done
 */
SourceTransformer.prototype.browserify = function (inputDir, inputFileName, outputDir, outputFileName, done) {
    var inputPath = $Path.join("./", outputDir, inputDir, inputFileName + ".js");
    var outputPath = $Path.join("./", outputDir, outputFileName + ".js");
    var outputStream = $FileSystem.createWriteStream(outputPath);
    var bundle = $Browserify();

    bundle.add(inputPath);

    outputStream.on('finish', function () {
        done();
    });

    outputStream.on('error', function (error) {
        done(error);
    });

    bundle.bundle().pipe(outputStream);
};

/**
 * Obfuscates the source code of the given file
 * @param {String} inputDir - Path to the src directory
 * @param {String} inputFileName - File name (without file extension) of the file which should be minified
 * @param {String} outputDir - Path to the destination directory
 * @param {String} outputFileName - File name (without file extension) of the minified file
 */
SourceTransformer.prototype.minify = function (inputDir, inputFileName, outputDir, outputFileName) {
    var source = new File(inputDir, inputFileName + ".js").read();

    // obfuscate code
    source = $Uglify.minify(source, {
        fromString: true
    }).code;

    // TODO: create source map
    new File(outputDir, outputFileName + ".min.js").write(source);
};


/**
 * Utility class used to generate parser from PEG grammar
 * @param {String} name - The name of the parser
 * @param {String} path - The path to the grammar file
 * @constructor
 * @example
 *      // generates a new parser using a PEG grammar
 *      var parser = new PEGParser("Author", "grammars");
 *      parser.build().writeTo("src/parser");
 */
function PEGParser(name, path) {
    this._name = name;
    this._path = path;
}

/**
 * Builds the parser
 * @returns {{writeTo: writeTo}} Returns an object containing a function to write the parser to the file system
 * @example
 *      PEGParser("Author", "grammars").build().writeTo("src/parser");
 */
PEGParser.prototype.build = function () {
    var grammarFileName = this._name.toLowerCase() + ".pegjs";
    var parserFileName = this._name.toLowerCase() + "_parser.js";
    var grammar = new File(this._path, grammarFileName).read();

    // generate parser using grammar
    var source = $PEG.buildParser(grammar, {
        output: "source"
    });

    // convert parser to a module
    source = $EJS.render("export var <%- name %> = <%- src %>;", {
        name: this._name + "Parser",
        src: source
    });

    return {
        writeTo: function (path) {
            new File(path, parserFileName).write(source);
        }
    };
};


/**
 * Representation of a file. Can be used to read or write data to the file-system
 * @param {String} name - The name of the file to write or read
 * @param {String} path - The path of the directory which contains or should contain the file
 * @constructor
 * @example
 *      // write data
 *      var file = new File("path/to/directory", "file.js");
 *      file.write("data to write");
 *
 *      // read data
 *      var file = new File("path/to/directory", "file.js");
 *      var data = file.read();
 */
function File(path, name) {
    this.name = name;
    this.path = path;
}

/**
 * Writes the file to the file system
 * @param {String} data - The data to write
 */
File.prototype.write = function (data) {
    var directory = $Path.join("./", this.path);
    var filePath = $Path.join(directory, this.name);

    // create folder if not exists
    if (!$FileSystem.existsSync(directory)) {
        $Mkdirp.sync(directory);
    }

    $FileSystem.writeFileSync(filePath, data);
};

/**
 * Reads the file from the file system
 * @returns {String} An UTF-8 encoded string which represents the content of the file
 */
File.prototype.read = function () {
    var filePath = $Path.join("./", this.path, this.name);
    return $FileSystem.readFileSync(filePath, {encoding: 'utf-8'});
};

/**
 * Checks whether the file has a specific file extension
 * @param {String} fileExtension - The expected file extension
 * @returns {boolean} Returns true if file has the expected file extension, false otherwise
 * @example
 *      var isJavaScriptFile = new File("path/to/file", "file_name.js").hasExtension(".js");
 */
// TODO: find solution which is able to detect the whole file extension
File.prototype.hasExtension = function (fileExtension) {
    return $Path.extname(this.name) === fileExtension;
};


/**
 * Representation of a directory
 * @param {String} path - The path of the directory
 * @constructor
 * @example
 *      var directory = new Directory("path/to/directory");
 */
function Directory(path) {
    this._path = path;
}

/**
 * Creates a result set with all files that pass the test implemented by the provided function
 * @callback Directory~filter
 * @param {File} file - The current file to test
 * @returns {Boolean} - Should return true if test is passed, false otherwise
 */

/**
 * Reads all files of the directory recursively
 * @param {Directory~filter} filter
 * @returns {File[]} Array of files
 * @example
 *      // gets all JavaScript files
 *      var files = new Directory("path/to/directory").readFiles(function(file) {
 *          return file.hasExtension(".js");
 *      });
 */
Directory.prototype.readFiles = function (filter) {
    // TODO: Add recursive parameter
    var directory = $Path.join("./" + this._path);
    var files = [];

    $FileWalker.walkSync(directory, {
        followLinks: false,
        listeners: {

            file: function (filePath, fileInfo, next) {
                var file = new File(filePath, fileInfo.name);

                if (!filter || filter(file)) {
                    files.push(file);
                }

                next();
            },

            error: function (filePath, fileInfo, next) {
                console.log("Unable to read file: " + fileInfo.name + " from: " + filePath);
                next();
            }
        }
    });

    return files;
};
