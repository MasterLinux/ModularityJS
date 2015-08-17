var childProcess = require('child_process'),
    esperanto = require('esperanto'),
    babel = require('babel-core'),
    uglify = require("uglify-js"),
    fs = require('fs');

desc('Task used to write a file to storage');
task('io:writeFile', function (params) {
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
task('io:writeFiles', function (params) {
    var writeTask = jake.Task['write:file'],
        outputDir = params.outputDir,
        files = params.files,
        file, i;

    for (i = 0; i < files.length; i++) {
        file = files[i];

        writeTask.invoke.apply(writeTask, [{
            isMinified: file.isMinified,
            fileName: file.fileName,
            source: file.source,
            outputDir: outputDir
        }]);
    }
});

desc('Task used to merge all ES6 modules into one');
task('build:mergeModules', {async: true}, function (params) {
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
task('build:transformToES5', {async: true}, function (params) {
    console.log("Start transforming ES6 code to ES5");

    var source = params.source,
        compiled;

    // transform to ES5
    compiled = babel.transform(source, {
        sourceMaps: false,
        comments: false,
        ast: false
    }).code;

    complete(compiled);
});

desc('Task used to minify source code');
task('build:minify', {async: true}, function (params) {
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
task('build:compile', {async: true}, function (params) {
    var mergeTask = jake.Task['build:mergeModules'],
        toES5Task = jake.Task['build:transformToES5'],
        minifyTask = jake.Task['build:minify'],
        inputDir = params.inputDir || "./src",
        fileName = params.fileName,
        transformedCode;

    mergeTask.addListener('complete', function (code) {
        if (code) {
            toES5Task.invoke.apply(toES5Task, [{
                source: code
            }]);
        } else {
            fail("Failed to merge ES6 modules");
        }
    });

    toES5Task.addListener('complete', function (code) {
        if (code) {
            transformedCode = code;
            minifyTask.invoke.apply(minifyTask, [{
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

    mergeTask.invoke.apply(mergeTask, [{
        fileName: fileName,
        inputDir: inputDir
    }]);
});


desc('Task used to build the framework');
task('build', {async: true}, function (params) {
    params = params || {};

    var compileFrameworkTask = jake.Task['build:compile'],
        compileTestsTask = jake.Task['build:compile'],
        testDir = params.testDir || "./tests",
        testFileName = params.testFileName || "modularity_core_test.js",
        srcDir = params.srcDir || "./src",
        fileName = params.fileName || "modularity.js",
        tests, src, isSrcCompiled = false, isTestSrcCompiled = false;

    compileFrameworkTask.addListener('complete', function (code) {
        isSrcCompiled = true;

        if (code) {
            src = code;
        } else {
            fail("Failed to compile source code");
        }

        if (isTestSrcCompiled) {
            complete();
        }
    });

    compileTestsTask.addListener('complete', function (code) {
        isTestSrcCompiled = true;

        if (code) {
            tests = code;
        } else {
            fail("Failed to compile tests");
        }

        if (isSrcCompiled) {
            complete();
        }
    });

    compileFrameworkTask.invoke.apply(compileFrameworkTask, [{
        fileName: fileName,
        inputDir: srcDir
    }]);

    compileTestsTask.invoke.apply(compileTestsTask, [{
        fileName: testFileName,
        inputDir: testDir
    }]);
});

desc('This task builds the framework');
task('build_bla', {async: true}, function () {
    var outputDir = './build/';
    var errorUutputDir = './build/error/';
    var frameworkPath = './src/modularity.js';
    var frameworkFileName = 'modularity';
    var frameworkErrorPath = './src/error/extension_exists_error.js';
    var frameworkErrorFileName = 'extension_exists_error';

    var frameworkNSErrorPath = './src/error/namespace_collision_error.js';
    var frameworkNSErrorFileName = 'namespace_collision_error';

    var testPath = './tests/modularity_core_test.js';
    var testFileName = 'modularity.test';

    var build = function (outputDir, filePath, fileName, complete) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            // transform to ES5
            var compiled = babel.transform(data, {
                sourceMaps: false,
                comments: false,
                ast: false
            }).code;

            // obfuscate code for min.js version
            var obfuscated = uglify.minify(compiled, {
                fromString: true,
                warnings: true
            }).code;

            try {
                // create new build folder if not exists
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir);
                }

                // write all necessary files
                fs.writeFileSync(outputDir + fileName + '.js', compiled);
                fs.writeFileSync(outputDir + fileName + '.min.js', obfuscated);
                console.log("build successful");

            } catch (e) {
                console.log(e);

            } finally {
                // complete async task
                complete();
            }
        });
    };

    build(outputDir, frameworkPath, frameworkFileName, function () {
        build(errorUutputDir, frameworkErrorPath, frameworkErrorFileName, function () {
            build(errorUutputDir, frameworkNSErrorPath, frameworkNSErrorFileName, function () {
                build(outputDir, testPath, testFileName, function () {
                    complete();
                });
            });
        });
    });
});

desc('This task generates the documentation of the framework');
task('docs', {async: true}, function () {
    childProcess.exec('jsdoc ../../src/modularity.js -d ../../build/docs/', {cwd: "./node_modules/.bin/"}, function (err, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        // complete async task
        complete();
    });
});

jake.addListener('complete', function () {
    console.log("Shutting down jake");
    process.exit();
});

jake.addListener('error', function (msg, code) {
    console.log("Error occurred");
    process.exit();
});