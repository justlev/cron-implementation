if which node > /dev/null
    then
        node app.js $1
    else
        echo "node is not installed. Please install node."
        exit 1
fi