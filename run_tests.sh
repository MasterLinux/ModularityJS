#!/usr/bin/env/ bash

SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $SCRIPT_PATH

if [ ! -f $SCRIPT_PATH/node_modules/.bin/jake ]
then
    npm rebuild
fi
./node_modules/.bin/jake build:all && ./node_modules/.bin/jake build:tests && ./node_modules/.bin/mocha build/all_tests.js
