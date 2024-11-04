# pull base image
FROM node:22-alpine

# set working directory
WORKDIR /code

# install dependencies
COPY package*.json /code/
RUN npm install

# copy project
COPY . .