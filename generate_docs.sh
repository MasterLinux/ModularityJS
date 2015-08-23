#!/usr/bin/env/ bash

source ./config.sh

cd $SCRIPT_PATH

if [ ! -f $SCRIPT_PATH/node_modules/.bin/jake ]
then
    npm rebuild
fi
./node_modules/.bin/jsdoc ./build/modularity.js -d ./build/docs/
