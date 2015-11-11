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

$Gulp.task('build parser', function () {
    // TODO: get all parser and generate each of them
    var parser = new PEGParser("Author", "grammars");
    parser.build().writeTo("src/parser");

    parser = new PEGParser("Version", "grammars");
    parser.build().writeTo("src/parser");
});

$Gulp.task('transform SCSS to CSS', function () {

});

$Gulp.task('transform ES6 to ES5', function (done) {
    var transformer = new SourceTransformer();

    transformer.transform(
        "src", "modularity",
        "build", "modularity",
        function (error) {
            if (error) {
                done(error);
            } else {
                done()
            }
        }
    );
});

function SourceTransformer() {

}

SourceTransformer.prototype.transform = function (inputDir, inputFileName, outputDir, outputFileName, done) {
    var transformer = this;

    console.log("1. Start transforming ES6 to ES5");
    this.transformES6ToES5(inputDir, outputDir);

    console.log("2. Start to make source code browser compatible");
    this.browserify(inputDir, inputFileName, outputDir, outputFileName, function (error) {

        if (!error) {
            console.log("3. Start to minify source code");
            transformer.minify(outputDir, inputFileName, outputDir, outputFileName);
            done();

        } else {
            done(error);
        }
    });
};

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
 */
SourceTransformer.prototype.minify = function (inputDir, inputFileName, outputDir, outputFileName) {
    var source = new File(inputDir, inputFileName + ".js").read();

    // obfuscate code
    source = $Uglify.minify(source, {
        fromString: true
    }).code;

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
 * Writes the file to the given directory path
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

// TODO: find solution which is able to detect the whole file extension
File.prototype.hasExtension = function (fileExtension) {
    return $Path.extname(this.name) === fileExtension;
};

/**
 * Reads the file from the given directory path
 * @returns {String} An UTF-8 encoded string which represents the content of the file
 */
File.prototype.read = function () {
    var filePath = $Path.join("./", this.path, this.name);
    return $FileSystem.readFileSync(filePath, {encoding: 'utf-8'});
};

/**
 * Representation of a directory
 * @param {String} path - The path of the directory
 * @constructor
 * @example
 *      var directory = new Directory("path/to/directory");
 *      var files = directory.readFiles();
 */
function Directory(path) {
    this._path = path;
}

// TODO: Add recursive parameter
Directory.prototype.readFiles = function (filter) {
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
