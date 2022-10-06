#!/bin/bash
sudo yum install nodejs
sudo yum install npm
sudo npm install pm2 -g
sudo cd ./home/ec2-user
sudo rm -r -f store-backend
sudo mkdir store-backend