#!/usr/bin/env bash

source ./config.sh

sh ./build.sh && ./node_modules/.bin/mocha build/modularity_tests.js
