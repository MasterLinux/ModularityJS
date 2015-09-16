#!/usr/bin/env bash

if [ ! -f ./node_modules/.bin/jake ]
then
    npm rebuild
fi

./node_modules/.bin/jake build:all
