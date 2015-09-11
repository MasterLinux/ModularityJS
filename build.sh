#!/usr/bin/env/ bash

#SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$(pwd)"
cd $SCRIPT_PATH

if [ ! -f $SCRIPT_PATH/node_modules/.bin/jake ]
then
    npm rebuild
fi
./node_modules/.bin/jake build:all
