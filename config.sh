
#SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$(pwd)"


if [ ! -f $SCRIPT_PATH/node_modules/.bin/jake ]
then
    npm rebuild
fi

#echo $SCRIPT_PATH
