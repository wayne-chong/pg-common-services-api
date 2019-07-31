#/bin/sh

echo "--------Installing confd in example/bin--------"
if [ ! -x ./bin/confd ]; then
    mkdir ./bin/
    wget https://github.com/kelseyhightower/confd/releases/download/v0.16.0/confd-0.16.0-darwin-amd64
    mv confd-0.16.0-darwin-amd64 ./bin/confd
fi

chmod +x ./bin/confd

echo "--------Pulling env variables from param store using aws credentials--------"

export AWS_REGION=ap-southeast-1

./bin/confd -backend ssm -onetime -confdir ./confd

echo "--------Finished pulling env variables--------"

