
#SCRIPT_PATH="$(cd "../$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$(cd ".." && pwd)"
UTILITIES_PATH="$(pwd)"


if [ ! -f $UTILITIES_PATH/node_modules/.bin/jake ]
then
    npm rebuild
fi

#echo $SCRIPT_PATH
