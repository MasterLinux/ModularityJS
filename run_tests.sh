#!/usr/bin/env/ bash

source ./config.sh

cd $SCRIPT_PATH

if [ ! -f $SCRIPT_PATH/node_modules/.bin/jake ]
then
    npm rebuild
fi
./node_modules/.bin/mocha build/modularity_tests.js
