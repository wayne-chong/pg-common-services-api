#/bin/sh

echo "--------PULLING ENVS FROM pg-envs--------"
echo "--------ASSUMING ENVS ARE IN SIBLING FOLDER FROM pg-common-services-api--------"
TARGET_DIR=$PWD
cd ../../pg-envs
git fetch
git pull

cp ./pg-common-serivces-api-example.env $TARGET_DIR/.env

echo "--------FINISHED PULLING ENVS FROM pg-envs--------"
