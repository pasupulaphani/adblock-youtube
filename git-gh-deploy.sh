#!/bin/sh

grunt

printf "\n ################### Grunt done ######################### \n"

git add .
git add -u


printf "\n ################### git status ######################### \n"
git status

git commit -m "deploy to gh-pages `date`"
git push origin gh-pages-gen

printf "\n ################### git committed and pushed ######################### \n"

if [ -z "$1" ]
then
  deploy_folder="dist"
else
  deploy_folder=$1
fi

echo "Deploying $deploy_folder folder to GitHub Pages"

git push origin `git subtree split --prefix $deploy_folder gh-pages-gen`:gh-pages --force
