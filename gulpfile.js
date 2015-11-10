var $Gulp = require('gulp'),
    $Babel = require('babel-core'),
    $Browserify = require("browserify"),
    $Uglify = require("uglify-js"),
    $PEG = require("pegjs"),
    $EJS = require("ejs"),
    $FileWalker = require('walk'),
    $Mkdirp = require('mkdirp'),
    $Path = require('path'),
    $FileSystem = require('fs');

$Gulp.task('build parser', function() {
    // TODO: get all parser and generate each of them
    var parser = new PEGParser("Author", "grammars");
    parser.build().writeTo("src/parser");

    parser = new PEGParser("Version", "grammars");
    parser.build().writeTo("src/parser");
});

$Gulp.task('compile SCSS', function() {

});

$Gulp.task('compile ES6', function() {
    var transformer = new ES5Transformer();

    // transform to ES5 and browserify
    transformer.browserify(
        "src", "modularity.js",
        "build", "modularity.js"
    );

    // minify source
    transformer.minify(
        "build", "modularity.js",
        "build", "modularity.min.js"
    )
});


function ES5Transformer() {

}

ES5Transformer.prototype.transform = function(inputDir, outputDir) {
    var inDir = $Path.join("./", inputDir);
    var files = new FileSystem().readFiles(inDir, function(root, name) {
        // TODO: filter all non .js files
        return true;
    });

    for (var i=0; i < files.length; i++) {
        var file = files[i];
        var outDir = $Path.join("./", outputDir, "out", file.path);

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

// TODO: make this function sync
ES5Transformer.prototype.browserify = function(inputDir, inputFileName, outputDir, outputFileName) {
    var inputPath = $Path.join("./", outputDir, "out", inputDir, inputFileName);
    var outputPath = $Path.join("./", outputDir, outputFileName);
    var outputStream = $FileSystem.createWriteStream(outputPath);
    var bundle = $Browserify();

    this.transform(inputDir, outputDir);

    bundle.add(inputPath);

    outputStream.on('finish', function () {
        console.log("done");
    });

    outputStream.on('error', function () {
        // TODO: fails on first execution, if no build dir exists
        console.log("error");
    });

    bundle.bundle().pipe(outputStream)
};

/**
 * Obfuscates the source code of the given file
 */
ES5Transformer.prototype.minify = function(inputDir, inputFileName, outputDir, outputFileName) {
    var source = new File(inputDir, inputFileName).read();

    // obfuscate code
    source = $Uglify.minify(source, {
        fromString: true
    }).code;

    new File(outputDir, outputFileName).write(source);
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
PEGParser.prototype.build = function() {
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
        writeTo: function(path) {
            new File(path, parserFileName).write(source);
        }
    };
};

/**
 * Helper class used to read or write files
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
 * Writes the file to the given directory path
 * @param {String} data - The data to write
 */
File.prototype.write = function(data) {
    var directory = $Path.join("./", this.path);
    var filePath = $Path.join(directory, this.name);

    // create folder if not exists
    if (!$FileSystem.existsSync(directory)) {
        $Mkdirp.sync(directory);
    }

    $FileSystem.writeFileSync(filePath, data);
};

/**
 * Reads the file from the given directory path
 * @returns {String} An UTF-8 encoded string which represents the content of the file
 */
File.prototype.read = function() {
    var filePath = $Path.join("./", this.path, this.name);
    return $FileSystem.readFileSync(filePath, {encoding: 'utf-8'});
};

function FileSystem() {

}

FileSystem.prototype.readFiles = function(path, filter) {
    var directory = $Path.join("./" + path);
    var files = [];

    $FileWalker.walkSync(directory, {
        followLinks: false,
        listeners: {

            file: function(filePath, fileInfo, next) {
                if (!filter || filter(filePath, fileInfo.name)) {
                    files.push(new File(filePath, fileInfo.name));
                }

                next();
            },

            error: function(filePath, fileInfo, next) {
                console.log("Unable to read file: " + fileInfo.name + " from: " + filePath);
                next();
            }
        }
    });

    return files;
};
