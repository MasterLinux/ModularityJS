var babel = require('babel-core'),
    uglify = require("uglify-js"),
    fs = require('fs');

desc('This task builds the framework');
task('build', {async: true}, function () {
    fs.readFile('./src/modularity.js', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // transform to ES5
        var compiled = babel.transform(data).code;

        // obfuscate code if not in development mode
        var obfuscated = uglify.minify(compiled, {fromString: true}).code;

        // used to write all necessary files
        var writeFiles = function (compiled, obfuscated, cb) {
            fs.writeFile('./build/modularity.js', compiled, function (err) {
                if (err) {
                    return console.log(err);
                }

                fs.writeFile('./build/modularity.min.js', obfuscated, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("build successful");

                    cb();
                });
            });
        };

        fs.exists('./build/', function (exists) {
            if (exists) {
                writeFiles(compiled, obfuscated, function () {
                    // complete async task
                    complete();
                });
            } else {
                fs.mkdir('./build/', function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    writeFiles(compiled, obfuscated, function () {
                        // complete async task
                        complete();
                    });
                });
            }
        });
    });
});

jake.addListener('complete', function () {
    console.log("shutting down jake");
    process.exit();
});