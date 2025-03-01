#!/bin/bash

# Step 1: Pull the latest changes from Git
echo "Pulling latest changes from Git..."
git pull origin master

# Check if the git pull was successful
if [ $? -ne 0 ]; then
  echo "Git pull failed. Exiting..."
  exit 1
fi

echo "Deployment completed successfully!"%
