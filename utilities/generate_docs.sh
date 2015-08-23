#!/usr/bin/env/ bash

source ./lib/config.sh

$UTILITIES_PATH/node_modules/.bin/jsdoc $SCRIPT_PATH/build/modularity.js -d $SCRIPT_PATH/build/docs/
