#/bin/sh

echo "--------PULLING ENVS FROM param store using aws credentials--------"

export AWS_REGION=ap-southeast-1

/usr/bin/confd -backend ssm -onetime -confdir ./confd

echo "--------FINISHED PULLING ENVS--------"

