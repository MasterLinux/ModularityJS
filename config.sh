#!/usr/bin/env bash

SCRIPT_PATH="$(pwd)"

if [ ! -f ./node_modules/.bin/jake ]
then
    npm rebuild
fi
