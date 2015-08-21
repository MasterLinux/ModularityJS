var childProcess = require('child_process'),
    esperanto = require('esperanto'),
    babel = require('babel-core'),
    uglify = require("uglify-js"),
    fs = require('fs');

namespace('io', function () {
    desc('Task used to write a file to storage');
    task('writeFile', function (params) {
        var outputDir = params.outputDir || "./build/",
            extension = params.isMinified ? ".min.js" : ".js",
            fileName = params.fileName,
            source = params.source,
            filePath;

        try {
            // create folder if not exists
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            filePath = outputDir + fileName + extension;
            fs.writeFileSync(filePath, source);

            console.log("Writing of File <" + filePath + "> successful");

        } catch (e) {
            fail("Unable to write file <" + fileName + ">", e);
        }
    });

    desc('Task used to write files to storage');
    task('writeFiles', function (params) {
        var writeTask = jake.Task['io:writeFile'],
            outputDir = params.outputDir,
            files = params.files,
            file, i;

        for (i = 0; i < files.length; i++) {
            file = files[i];

            writeTask.execute.apply(writeTask, [{
                isMinified: file.isMinified,
                fileName: file.fileName,
                source: file.source,
                outputDir: outputDir
            }]);
        }
    });
});

namespace('build', function () {
    desc('Task used to merge all ES6 modules into one');
    task('mergeModules', {async: true}, function (params) {
        console.log("Start merging ES6 modules");

        var inputDir = params.inputDir || "./src",
            fileName = params.fileName;

        esperanto.bundle({
            base: inputDir,
            entry: fileName
        }).then(function (bundle) {
            var cjs, code = null;

            try {
                cjs = bundle.toCjs({strict: true});
                code = cjs.code;

                complete(code);

            } catch (e) {
                fail("Failed to merge modules: " + e.message);
            }
        });
    });

    desc('Task used to transform ES6 code to ES5');
    task('transformToES5', {async: true}, function (params) {
        console.log("Start transforming ES6 code to ES5");

        var source = params.source,
            compiled;

        // transform to ES5
        compiled = babel.transform(source, {
            sourceMaps: false,
            comments: true,
            ast: false
        }).code;

        complete(compiled);
    });

    desc('Task used to minify source code');
    task('minify', {async: true}, function (params) {
        console.log("Start minifying source code");

        var source = params.source,
            minified;

        // obfuscate code for min.js version
        try {
            minified = uglify.minify(source, {
                fromString: true,
                warnings: true
            }).code;

            complete(minified);

        } catch (e) {
            console.log("Failed to minify source code: " + e.message);
            fail("Failed to minify source code: " + e.message);
        }
    });

    desc('Task used to merge and transform and minify ES6 source code');
    task('compile', {async: true}, function (params) {
        var mergeTask = jake.Task['build:mergeModules'],
            toES5Task = jake.Task['build:transformToES5'],
            minifyTask = jake.Task['build:minify'],
            inputDir = params.inputDir || "./src",
            fileName = params.fileName,
            transformedCode;

        mergeTask.addListener('complete', function (code) {
            if (code) {
                toES5Task.execute.apply(toES5Task, [{
                    source: code
                }]);
            } else {
                fail("Failed to merge ES6 modules");
            }
        });

        toES5Task.addListener('complete', function (code) {
            if (code) {
                transformedCode = code;
                minifyTask.execute.apply(minifyTask, [{
                    source: code
                }]);
            } else {
                fail("Failed to transform source code");
            }
        });

        minifyTask.addListener('complete', function (minifiedCode) {
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
            fileName: fileName,
            inputDir: inputDir
        }]);
    });

    desc('Task used to build the framework');
    task('all', {async: true}, function (params) {
        params = params || {};

        var compileTask = jake.Task['build:compile'],
            writeFilesTask = jake.Task['io:writeFiles'],
            buildDocsTask = jake.Task['build:docs'],
            testDir = params.testDir || "./tests",
            testFileName = params.testFileName || "all_tests.js",
            srcDir = params.srcDir || "./src",
            fileName = params.fileName || "modularity.js",
            testSrc, frameworkSrc, isFrameworkCompiled = false;

        buildDocsTask.addListener('complete', function () {
            complete();
        });

        compileTask.addListener('complete', function (code) {
            if (!isFrameworkCompiled) {
                isFrameworkCompiled = true;
                frameworkSrc = code;

                console.log("\n---------------------");
                console.log("Start compiling tests");
                compileTask.execute.apply(compileTask, [{
                    fileName: testFileName,
                    inputDir: testDir
                }]);
            } else {
                testSrc = code;

                console.log("\n---------------------");
                console.log("Start writing files");
                writeFilesTask.execute.apply(writeFilesTask, [{
                    outputDir: "./build/",
                    files: [{
                        isMinified: true,
                        fileName: "modularity",
                        source: frameworkSrc.minified
                    }, {
                        isMinified: true,
                        fileName: "modularity_tests",
                        source: testSrc.minified
                    }, {
                        isMinified: false,
                        fileName: "modularity",
                        source: frameworkSrc.code
                    }, {
                        isMinified: false,
                        fileName: "modularity_tests",
                        source: testSrc.code
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
            fileName: fileName,
            inputDir: srcDir
        }]);
    });

    desc('Task used to generate the documentation');
    task('docs', {async: true}, function () {
        childProcess.exec('jsdoc ../../build/modularity.js -d ../../build/docs/', {
            cwd: "./node_modules/.bin/"
        }, function (error, stdout, stderr) {
            if (error) {
                fail("Failed to generate documentation. stdout: " + stdout + " - stderr: " + stderr)
            } else {
                complete();
            }
        });
    });
});

jake.addListener('complete', function () {
    console.log("\nShutting down jake");
    process.exit();
});

jake.addListener('error', function (msg, code) {
    console.log("\nError occurred: " + msg);
    process.exit();
});