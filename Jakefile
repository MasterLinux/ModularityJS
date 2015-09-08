
var
    childProcess = require('child_process'),
    // esperanto = require('esperanto'), // todo delete
    babel = require('babel-core'),
    uglify = require("uglify-js"),
    fs = require('fs');

namespace('io', function() {


    desc('Task used to write a file to storage');
    task('writeFile', function(params) {
        var extension = params.isMinified ? ".min.js" : ".js",
            filePath = params.outputDir + params.fileName + extension;

        try {
            // create folder if not exists
            if (!fs.existsSync(params.outputDir)) {
                fs.mkdirSync(params.outputDir);
            }

            fs.writeFileSync(filePath, params.source);

            console.log("Writing of File <" + filePath + "> successful");

        } catch (e) {
            fail("Unable to write file <" + params.fileName + ">", e);
        }
    });

    desc('Task used to write files to storage');
    task('writeFiles', function(params) {
        var writeTask = jake.Task['io:writeFile'],
            files = params.files,
            file,
            i = 0;

        for (i; i < files.length; i++) {
            file = files[i];

            writeTask.execute.apply(writeTask, [{
                isMinified: file.isMinified,
                fileName: file.fileName,
                source: file.source,
                outputDir: params.outputDir
            }]);
        }
    });
});

namespace('build', function() {

    var
        taskOptions = {async: true};


    desc('Task used to merge all ES6 modules into one');
    task('mergeModules', taskOptions, function(params) {
        console.log("Start merging ES6 modules");
        /*
        
        esperanto.bundle({
            base: params.inputDir,
            entry: params.fileName
        }).then(function(bundle) {
            try {
                complete(bundle.toCjs({strict: true}).code);
            } catch (e) {
                fail("Failed to merge modules: " + e.message);
            }
        });

        */

        // TODO - lets try babel

        fs.readdir(params.inputDir, function(err, file) {
            if (err) throw err;

            console.log(params.inputDir, file);
            file.forEach(function(item) {
                var data = params.inputDir + "/" + item;

                if (fs.lstatSync(data).isFile()) {
                    fs.readFile(data, 'utf-8', function(err, result) {
                        if (err) throw err;

                        // console.log(result.code, result.map, result.ast);
                        complete(babel.transform(result, {
                            sourceMaps: true,
                            comments: true,
                            ast: false
                        }).code);

                    });
                }
            });

        });
    });


    desc('Task used to transform ES6 code to ES5');
    task('transformToES5', taskOptions, function(params) {
        console.log("Start transforming ES6 code to ES5");
        complete(babel.transform(params.source, {
            sourceMaps: false,
            comments: true,
            ast: false
        }).code);
    });


    desc('Task used to minify source code');
    task('minify', taskOptions, function(params) {
        console.log("Start minifying source code");
        try {
            complete(uglify.minify(params.source, {
                fromString: true,
                warnings: true
            }).code);
        } catch (e) {
            console.log("Failed to minify source code: " + e.message);
            fail("Failed to minify source code: " + e.message);
        }
    });


    desc('Task used to merge and transform and minify ES6 source code');
    task('compile', taskOptions, function(params) {
        var mergeTask = jake.Task['build:mergeModules'],
            toES5Task = jake.Task['build:transformToES5'],
            minifyTask = jake.Task['build:minify'],
            transformedCode;
        mergeTask.addListener('complete', function(code) {
            if (code) {
                toES5Task.execute.apply(toES5Task, [{
                    source: code
                }]);
            } else {
                fail("Failed to merge ES6 modules");
            }
        });

        toES5Task.addListener('complete', function(code) {
            if (code) {
                transformedCode = code;
                minifyTask.execute.apply(minifyTask, [{
                    source: transformedCode
                }]);
            } else {
                fail("Failed to transform source code");
            }
        });

        minifyTask.addListener('complete', function(minifiedCode) {
            if (minifiedCode) {
                complete({
                    code: transformedCode,
                    minified: minifiedCode
                });
            } else {
                fail("Failed to minify source code");
            }
        });

        mergeTask.execute.apply(mergeTask, [{
            fileName: params.fileName,
            inputDir: params.inputDir
        }]);
    });


    desc('Task used to build the framework');
    task('all', taskOptions, function(params) {
        params = params || {};
        params.testDir = params.testDir || "./tests";
        params.testFileName = params.testFileName || "all_tests.js";
        params.srcDir = params.srcDir || "./src";
        params.fileName = params.fileName || "modularity.js";
        params.outputDir = params.outputDir || "./build/";
        // params.isMinified
        // params.extension
        // params.source

        var compileTask = jake.Task['build:compile'],
            writeFilesTask = jake.Task['io:writeFiles'],
            buildDocsTask = jake.Task['build:docs'],
            isFrameworkCompiled = false;

        buildDocsTask.addListener('complete', function() {
            complete();
        });

        compileTask.addListener('complete', function(code) {
            if (!isFrameworkCompiled) {
                isFrameworkCompiled = true;

                console.log("\n---------------------");
                console.log("Start compiling tests");
                compileTask.execute.apply(compileTask, [{
                    fileName: params.testFileName,
                    inputDir: params.testDir
                }]);
            } else {

                console.log("\n---------------------");
                console.log("Start writing files");
                writeFilesTask.execute.apply(writeFilesTask, [{
                    outputDir: params.outputDir,
                    files: [{
                        isMinified: true,
                        fileName: "modularity",
                        source: code.minified
                    }, {
                        isMinified: true,
                        fileName: "modularity_tests",
                        source: code.minified
                    }, {
                        isMinified: false,
                        fileName: "modularity",
                        source: code.code
                    }, {
                        isMinified: false,
                        fileName: "modularity_tests",
                        source: code.code
                    }]
                }]);

                console.log("\n---------------------");
                console.log("Start generating documentation");
                buildDocsTask.execute();
            }
        });

        console.log("\n-------------------------");
        console.log("Start compiling framework");
        compileTask.execute.apply(compileTask, [{
            fileName: params.fileName,
            inputDir: params.srcDir
        }]);
    });


    desc('Task used to generate the documentation');
    task('docs', taskOptions, function() {
        childProcess.exec('jsdoc ./build/modularity.js -d ./build/docs/', {
            cwd: "./node_modules/.bin/"
        }, function(error, stdout, stderr) {
            if (error) {
                fail("Failed to generate documentation. stdout: " + stdout + " - stderr: " + stderr)
            } else {
                complete();
            }
        });
    });


});


jake.addListener('complete', function() {
    console.log("\nShutting down jake");
    process.exit();
});


jake.addListener('error', function(msg, code) {
    console.log("\nError occurred: " + msg);
    process.exit();
});