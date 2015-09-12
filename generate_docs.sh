#!/usr/bin/env bash

if [ ! -f ./node_modules/.bin/jsdoc ]
then
    npm rebuild
fi

sh ./build.sh && echo "Start create documentation" &&

if [ "$(uname)" == "Darwin" ]; then
    # Mac OSX require some config to generate documentation
    ./node_modules/.bin/jsdoc ./build/modularity.js -d ./build/docs/ -c ./jsdoc.mac.conf.json
else
    ./node_modules/.bin/jsdoc ./build/modularity.js -d ./build/docs/
fi
