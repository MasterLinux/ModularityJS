var babel = require('babel-core'),
    fileWalker = require('walk'),
    fs = require('fs'),
    uglify = require("uglify-js"),
    KarmaServer = require("karma").Server,
    mkdirp = require('mkdirp'),
    path = require('path'),
    browserify = require("browserify");

namespace("spec", function () {

    var KARMA_CONFIG = path.resolve("./karma.conf.js");

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
    }, {async: true});

    desc("Watch files and run specs on changes");
    task("watch", {async: true}, function () {

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

    desc('Task used to merge all source code files into one');
    task('merge', {async: true}, function (params) {
        console.log("Start merging source code");
        var inputDir = params.inputDir || "./build/src",
            outputDir = params.outputDir || "./build",
            inputPath = path.join(inputDir, params.fileName + ".js"),
            outputPath = path.join(outputDir, params.fileName + ".js"),
            outputStream = fs.createWriteStream(outputPath),
            bundle = browserify();

        bundle.add(inputPath);

        outputStream.on('finish', function () {
            complete();
        });

        outputStream.on('error', function () {
            fail("Merging source code failed");
        });

        bundle.bundle().pipe(outputStream)
    });

    desc('Task used to transform ES6 code to ES5');
    task('transformToES5', {async: true}, function (params) {
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
    task('minify', {async: true}, function (params) {
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
    task('compile', {async: true}, function (params) {
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
    task('all', {async: true}, function (params) {
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
    task('tests', {async: true}, function (params) {
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
