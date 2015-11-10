var $Gulp = require('gulp'),
    $PEG = require("pegjs"),
    $EJS = require("ejs"),
    $Mkdirp = require('mkdirp'),
    $Path = require('path'),
    $FileSystem = require('fs');

$Gulp.task('build parser', function() {
    // TODO: get all parser and generate each of them
    var parser = new PEGParser("Author", "grammars");
    parser.build().writeTo("build/parser/test");
});

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
    var grammar = new File(grammarFileName).readFrom(this._path);

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
            new File(parserFileName, source).writeTo(path);
        }
    };
};

/**
 * Helper class used to read or write files
 * @param {String} name - The name of the file to write or read
 * @param {String} [data] - The data to write. This is an optional parameter and just required if data must be written to disk
 * @constructor
 * @example
 *      // write data
 *      var file = new File("file.js", "data to write");
 *      file.writeTo("path/to/directory");
 *
 *      // read data
 *      var file = new File("file.js");
 *      var data = file.readFrom("path/to/directory");
 */
function File(name, data) {
    this._name = name;
    this._data = data;
}

/**
 * Writes the file to the given directory path
 * @param {String} path - The directory path to write the file to
 */
File.prototype.writeTo = function(path) {
    var directory = $Path.join("./", path);
    var filePath = $Path.join(directory, this._name);

    // create folder if not exists
    if (!$FileSystem.existsSync(directory)) {
        $Mkdirp.sync(directory);
    }

    $FileSystem.writeFileSync(filePath, this._data);
};

/**
 * Reads the file from the given directory path
 * @param {String} path - The directory path to read the file from
 * @returns {String} An UTF-8 encoded string which represents the content of the file
 */
File.prototype.readFrom = function(path) {
    var filePath = $Path.join("./", path, this._name);
    return $FileSystem.readFileSync(filePath, {encoding: 'utf-8'});
};
