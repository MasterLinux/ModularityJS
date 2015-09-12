#!/usr/bin/env bash

source ./config.sh

sh ./build.sh && echo "Start create documentation" &&

if [ "$(uname)" == "Darwin" ]; then
    # Do something under Mac OS X platform
    ./node_modules/.bin/jsdoc ./build/modularity.js -d ./build/docs/ -c ./config_jsdoc.json
else
    ./node_modules/.bin/jsdoc ./build/modularity.js -d ./build/docs/
fi
