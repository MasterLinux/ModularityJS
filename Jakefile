var babel = require('babel-core'),
    uglify = require("uglify-js"),
    fs = require('fs'),
    fileWalker = require('walk'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    KarmaServer = require("karma").Server,
    os = require('os');

namespace("spec", function () {

    var KARMA_CONFIG = path.resolve("./karma.conf.js"),
        taskOptions = { async: true };

    desc("Run all specs");
    task("run", function () {
        var server = new KarmaServer({
            configFile: KARMA_CONFIG,
            browsers: ["PhantomJS2"],
            reporters: ["dots"],
            singleRun: true,
            autoWatch: false,
            colors: false
        }, function (exitCode) {
            if (exitCode === 0) {
                complete();
            } else {
                fail("Karma has exited with " + exitCode);
            }
        });

        server.start();
    }, taskOptions);

    desc("Watch files and run specs on changes");
    task("watch", taskOptions, function () {

        var server = new KarmaServer({
            configFile: KARMA_CONFIG,
            browsers: ["PhantomJS2"],
            reporters: ["progress"],
            singleRun: false,
            autoWatch: true,
            colors: true
        }, function (exitCode) {
            if (exitCode === 0) {
                complete();
            } else {
                fail("Karma has exited with " + exitCode);
            }
        });
        server.start();
    });
});

namespace('build', function () {

    var taskOptions = { async: true };

    desc('Task used to merge all source code files into one');
    task('merge', taskOptions, function (params) {
        console.log("Start merging source code");
        var inputDir = params.inputDir || "./build/src",
            outputDir = params.outputDir || "./build",
            /**
             * Solution for Windows & OSX
             *
             * os.platform();
             * 'linux' on Linux
             * 'win32' on Windows 32-bit
             * 'win64' on Windows 64-bit
             * 'darwin' on OSX
             * os.arch();
             * 'x86' on 32-bit CPU architecture
             * 'x64' on 64-bit CPU architecture
             */
            platformPath = os.platform() === "darwin" ? "./" : "../../",
            inputPath = path.resolve(platformPath, inputDir, params.fileName + ".js"),
            outputPath = path.resolve(platformPath, outputDir, params.fileName + ".js");

        jake.exec(['browserify ' + inputPath + ' -o ' + outputPath], {printStdout: true}, function () {
            complete();
        });

    });

    desc('Task used to transform ES6 code to ES5');
    task('transformToES5', taskOptions, function (params) {
        console.log("Start transforming ES6 code to ES5");
        var walker = fileWalker.walk(params.inputDir, {followLinks: false});

        walker.on('file', function (root, stat, next) {
            var outputDir = path.join(params.outputDir, root),
                outputPath = path.join(outputDir, stat.name),
                inputPath = path.join(root, stat.name),

                // get source code
                source = fs.readFileSync(inputPath, {encoding: 'utf-8'}),

                // transform to ES5
                transformed = babel.transform(source, {
                    modules: "common",
                    sourceMaps: false,
                    comments: true,
                    ast: false
                }).code;

            // create folder if not exists
            if (!fs.existsSync(outputDir)) {
                mkdirp.sync(outputDir);
            }

            // write file to storage
            fs.writeFileSync(outputPath, transformed);

            next();
        });

        walker.on('end', function () {
            complete();
        });
    });

    desc('Task used to minify source code');
    task('minify', taskOptions, function (params) {
        console.log("Start minifying source code");

        // get source code
        var outputDir = params.outputDir,
            inputPath = path.join(params.inputDir, params.fileName + ".js"),
            outputPath = path.join(outputDir, params.fileName + ".min.js"),
            source = fs.readFileSync(inputPath, {encoding: 'utf-8'}),
            minified;

        try {
            // obfuscate code for min.js version
            minified = uglify.minify(source, {
                fromString: true
            }).code;

            // create folder if not exists
            if (!fs.existsSync(outputDir)) {
                mkdirp.sync(outputDir);
            }

            // write file to storage
            fs.writeFileSync(outputPath, minified);

            complete();

        } catch (e) {
            console.log("Failed to minify source code: " + e.message);
            fail("Failed to minify source code: " + e.message);
        }
    });

    desc('Task used to merge and transform and minify ES6 source code');
    task('compile', taskOptions, function (params) {
        var toES5Task = jake.Task['build:transformToES5'],
            minifyTask = jake.Task['build:minify'],
            mergeTask = jake.Task['build:merge'],
            inputDir = path.join(params.inputDir || "./src"),
            outputDir = path.join(params.outputDir || "./build"),
            fileName = params.fileName;

        toES5Task.addListener('complete', function () {
            mergeTask.execute.apply(mergeTask, [{
                inputDir: path.join(outputDir, inputDir),
                outputDir: outputDir,
                fileName: fileName
            }]);
        });

        mergeTask.addListener('complete', function () {
            minifyTask.execute.apply(minifyTask, [{
                inputDir: outputDir,
                outputDir: outputDir,
                fileName: fileName
            }]);
        });

        minifyTask.addListener('complete', function () {
            complete();
        });

        toES5Task.execute.apply(toES5Task, [{
            inputDir: inputDir,
            outputDir: outputDir
        }]);
    });

    desc('Task used to build the framework');
    task('all', taskOptions, function (params) {
        params = params || {};

        var compileTask = jake.Task['build:compile'],
            compileTestsTask = jake.Task['build:compile'],
            srcDir = path.join(params.srcDir || "./src"),
            fileName = params.fileName || "modularity";

        compileTestsTask.addListener('complete', function () {
            complete();
        });

        console.log("\n-------------------------");
        console.log("Start compiling framework");

        compileTask.execute.apply(compileTask, [{
            fileName: fileName,
            inputDir: srcDir
        }]);
    });

    desc('Task used to build the all tests');
    task('tests', taskOptions, function (params) {
        params = params || {};

        var compileTestsTask = jake.Task['build:compile'],
            testDir = path.join(params.testDir || "./tests"),
            testFileName = params.testFileName || "all_tests";

        compileTestsTask.addListener('complete', function () {
            complete();
        });

        console.log("\n-------------------------");
        console.log("Start compiling tests");

        compileTestsTask.execute.apply(compileTestsTask, [{
            fileName: testFileName,
            inputDir: testDir
        }]);
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