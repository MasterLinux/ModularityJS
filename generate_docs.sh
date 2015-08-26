#!/usr/bin/env/ bash

source ./config.sh

./node_modules/.bin/jsdoc ./build/modularity.js -d ./build/docs/
