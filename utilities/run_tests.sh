#!/usr/bin/env/ bash

source ./lib/config.sh

$UTILITIES_PATH/node_modules/.bin/mocha build/modularity_tests.js
