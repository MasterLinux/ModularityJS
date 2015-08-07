var childProcess = require('child_process'),
    babel = require('babel-core'),
    uglify = require("uglify-js"),
    fs = require('fs');

desc('This task builds the framework');
task('build', {async: true}, function () {
    var outputDir = './build/';

    fs.readFile('./src/modularity.js', 'utf8', function (err, data) {
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
            fs.writeFileSync(outputDir + 'modularity.js', compiled);
            fs.writeFileSync(outputDir + 'modularity.min.js', obfuscated);
            console.log("build successful");

        } catch (e) {
            console.log(e);

        } finally {
            // complete async task
            complete();
        }
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
    console.log("shutting down jake");
    process.exit();
});
