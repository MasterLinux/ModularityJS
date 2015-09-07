#!/usr/bin/env bash

#SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$(pwd)"
#echo $SCRIPT_PATH


if [ ! -f ./node_modules/.bin/jake ]
then
    npm rebuild
fi
